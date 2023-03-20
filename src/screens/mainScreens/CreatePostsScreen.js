import React, { useState, useEffect } from "react";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import {
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { nanoid } from "nanoid";
import { firestore, storage } from "../../firebase/config";
import { useSelector } from "react-redux";
import {
  selectDisplayName,
  selectUserId,
} from "../../redux/auth/auth.selectors";

const CreatePostsScreen = ({ navigation }) => {
  const [camera, setCamera] = useState(null);
  const [postName, setPostName] = useState("user post");
  const [postLocation, setPostLocation] = useState("Lviv");
  const [region, setRegion] = useState("");
  const [postLocationGPS, setPostLocationGPS] = useState(null);
  const [photo, setPhoto] = useState("");
  const [isKeyboardShow, setIsKeyboardShow] = useState(false);

  const userId = useSelector(selectUserId);
  const displayName = useSelector(selectDisplayName);
  const postNameHandler = (text) => setPostName(text.trim());
  const postLocationHandler = (text) => setPostLocation(text.trim());

  const takePhoto = async () => {
    try {
      const photo = await camera.takePictureAsync();
      await MediaLibrary.requestPermissionsAsync();

      let photoLocation = await Location.getCurrentPositionAsync({});
      let coords = {
        latitude: photoLocation.coords.latitude,
        longitude: photoLocation.coords.longitude,
      };
      let address = await Location.reverseGeocodeAsync(coords);
      let city = address[0].city;
      setPostLocationGPS(coords);
      setRegion(city);

      setPhoto(photo.uri);
    } catch (error) {
      console.log("error", error.message);
    }
  };

  const uploadPhotoToServer = async () => {
    const postId = Date.now().toString();

    const path = `images/${postId}.jpeg`;
    const storageRef = ref(storage, path);

    const response = await fetch(photo);
    const file = await response.blob();

    await uploadBytes(storageRef, file).then(() => {
      console.log("Uploaded a blob or file!");
    });

    const processedPhoto = await getDownloadURL(storageRef)
      .then((downloadURL) => {
        return downloadURL;
      })
      .catch((error) => {
        console.log(error.message);
      });

    return processedPhoto;
  };

  const uploadPostToServer = async () => {
    const photo = await uploadPhotoToServer();
    const newPost = {
      userId,
      displayName,
      photo,
      postName,
      comments: 0,
      likes: 0,
      postLocation,
      location: {
        region,
        ...postLocationGPS,
      },
    };
    console.log(newPost);
    try {
      await addDoc(collection(firestore, "posts"), newPost);
      console.log("Post is loaded. Well Done");
    } catch (error) {
      console.log(
        "ERRRRRRRRRRRRRRRRRRRRRRRRRRROOOOOOOOOOOOOOOOOOOOOOOOOOOOOORRRRRRRRRRRRRRRRRRRRRRRRRRRRRR"
      );
      console.error("Error while adding doc: ", error.message);
    }
  };
  useEffect(() => {
    const getCameraPermission = async () => {
      let { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg(
          "Access denied. Permission is required to access the camera."
        );
        return;
      }
    };

    const getLocationPermission = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg(
          "Access denied. Permission is required to access the location."
        );
        return;
      }
    };

    getCameraPermission();
    getLocationPermission();
  }, []);

  const isSubmitButtonDisabled = () => {
    return !photo || postName === "" || postLocation === "" ? true : false;
  };

  const onSubmitHandler = async () => {
    uploadPhotoToServer();
    uploadPostToServer();

    navigation.navigate("DefaultPostScreen");
    Keyboard.dismiss();
    clearPostMeta();
  };

  const clearPostMeta = () => {
    // setPostName("");
    // setPostLocation("");
    // setPhoto("");
  };

  const keyboardHide = () => {
    setIsKeyboardShow(false);
    Keyboard.dismiss();
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableWithoutFeedback onPress={keyboardHide}>
        <View>
          <View
            style={{
              height: "100%",
              justifyContent: "space-between",
            }}
          >
            <View>
              {!isKeyboardShow &&
                (photo ? (
                  <View style={styles.takenPhotoContainer}>
                    <Image
                      source={{ uri: photo }}
                      style={{ height: 240, width: "100%" }}
                    />
                    <TouchableOpacity
                      style={styles.newPhotoButton}
                      onPress={() => setPhoto("")}
                    >
                      <Ionicons name="camera-reverse" size={24} color="white" />
                      <Text style={{ color: "#FFFFFF" }}>Змінити фото</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <Camera ref={setCamera} style={styles.camera}>
                    <TouchableOpacity
                      style={styles.takePhotoButton}
                      onPress={takePhoto}
                    >
                      <Ionicons name="camera-sharp" size={20} color="#BDBDBD" />
                    </TouchableOpacity>
                  </Camera>
                ))}

              <View style={styles.formBox}>
                <TouchableOpacity>
                  <Text style={styles.loadLabel}>Завантажте фото</Text>
                </TouchableOpacity>
                <KeyboardAvoidingView
                  behavior={Platform.OS == "ios" ? "padding" : "height"}
                >
                  <TextInput
                    value={postName}
                    onChangeText={postNameHandler}
                    placeholder="Назва..."
                    placeholderTextColor="#BDBDBD"
                    style={styles.input}
                    onFocus={() => {
                      setIsKeyboardShow(true);
                    }}
                  />
                  <View>
                    <Ionicons
                      style={styles.locationIcon}
                      name="location-outline"
                      size={22}
                      color="#BDBDBD"
                    />
                    <TextInput
                      value={postLocation}
                      onChangeText={postLocationHandler}
                      placeholder="Місцевість..."
                      placeholderTextColor="#BDBDBD"
                      style={[styles.input, styles.addPlace]}
                      onFocus={() => {
                        setIsKeyboardShow(true);
                      }}
                    />
                  </View>
                  <TouchableOpacity
                    title={"Опублікувати"}
                    onPress={onSubmitHandler}
                    accessibilityLabel="Опублікувати"
                    activeOpacity={0.8}
                    style={[
                      styles.submitButton,
                      isSubmitButtonDisabled()
                        ? styles.invalidButton
                        : styles.validButton,
                    ]}
                  >
                    <Text
                      style={[
                        styles.submitBtnText,
                        isSubmitButtonDisabled()
                          ? styles.invalidBtn
                          : styles.validBtn,
                      ]}
                    >
                      Опублікувати
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.removeButton}>
                    <Ionicons name="trash-outline" size={30} color="#BDBDBD" />
                  </TouchableOpacity>
                </KeyboardAvoidingView>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

export default CreatePostsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    position: "relative",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 55,
    paddingBottom: 11,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.3)",
  },
  title: {
    fontSize: 17,
    lineHeight: 22,
  },

  backBtn: {
    position: "absolute",
    top: 55,
    left: 16,
  },
  camera: {
    height: 240,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    marginHorizontal: 16,
    marginTop: 32,
  },
  takenPhotoContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 16,
    marginTop: 32,
  },
  takePhotoButton: {
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    width: 60,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 50,
  },
  cameraIcon: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  loadLabel: {
    fontSize: 16,
    fontWeight: "400",
    color: "#BDBDBD",
    marginBottom: 32,
  },
  formBox: {
    marginHorizontal: 16,
    marginTop: 8,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    fontSize: 16,
    fontWeight: "400",
    height: 48,
    padding: 16,
    marginBottom: 16,
    borderBottomColor: "#E8E8E8",
    borderBottomWidth: 1,
  },
  location: {
    position: "absolute",
    left: 0,
    bottom: 15,
  },
  addPlace: {
    paddingLeft: 28,
  },
  locationIcon: {
    position: "absolute",
    top: 10,
    left: 4,
  },

  submitButton: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 32,
    marginBottom: 100,
    height: 50,
    borderWidth: 1,
    borderRadius: 100,
    borderColor: "#F6F6F6",
  },
  validButton: {
    backgroundColor: "#FF6C00",
    color: "#FFFFFF",
  },
  invalidButton: {
    backgroundColor: "#F6F6F6",
    color: "#BDBDBD",
  },
  submitBtnText: { fontFamily: "Roboto" },
  deleteWrapp: {
    height: 40,
    width: 70,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
  },
  newPhotoButton: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  removeButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // padding: 15,
    backgroundColor: "#F6F6F6",
    height: 40,
    width: 70,
    borderRadius: 20,
    alignSelf: "center",
  },
});
