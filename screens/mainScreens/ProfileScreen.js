import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { collection, onSnapshot } from "firebase/firestore";
import { firestore } from "../../firebase/config";

import { logOut } from "../../redux/auth/auth.operations";
import {
  selectDisplayName,
  selectUserEmail,
  selectUserId,
  selectUserPhotoURL,
} from "../../redux/auth/auth.selectors";

import PostItem from "../../components/PostItem/PostItem";
import { MaterialIcons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";

import {
  StyleSheet,
  View,
  ImageBackground,
  SafeAreaView,
  Pressable,
  Text,
  Dimensions,
  FlatList,
} from "react-native";

const backgroundPicture = "../../img/photo-bg.jpg";

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const displayName = useSelector(selectDisplayName);
  const photoURL = useSelector(selectUserPhotoURL);
  const userId = useSelector(selectUserId);
  const [posts2, setPosts2] = useState([]);

  const [windowWidth, setWindowWidth] = useState(
    Dimensions.get("window").width
  );

  const [windowHeight, setWindowHeight] = useState(
    Dimensions.get("window").height
  );

  const logOutHandler = () => {
    dispatch(logOut());
  };

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width;
      setWindowWidth(width);
      const height = Dimensions.get("window").height;
      setWindowHeight(height);
    };
    const dimensionsHandler = Dimensions.addEventListener("change", onChange);

    return () => dimensionsHandler?.remove();
  }, []);

  const getAllPosts = async () => {
    const firestoreRef = collection(firestore, "posts");
    onSnapshot(firestoreRef, (querySnapshot) => {
      const postsFromDB = [];
      querySnapshot.forEach((doc) =>
        postsFromDB.push({ ...doc.data(), id: doc.id })
      );
      console.log("USER POSTS", postsFromDB);
      console.log("USER ID", userId);
      const userPostsFromDB = postsFromDB.filter(
        (post) => post.userId === userId
      );
      console.log("USER POSTS", userPostsFromDB);
      setPosts2(userPostsFromDB);
    });
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require(backgroundPicture)}
        style={{
          ...styles.imageBgImage,
          width: windowWidth,
          height: windowHeight,
        }}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            marginTop: 147,
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            backgroundColor: "#fff",
            paddingHorizontal: 16,
          }}
        >
          <View style={styles.userAvatar}>
            <ImageBackground
              source={{ uri: photoURL }}
              resizeMode="cover"
              style={styles.userImageBackground}
            >
              <Pressable
                style={[styles.delButton]}
                onPress={() => {
                  console.log("2023");
                }}
              >
                <MaterialIcons
                  name="highlight-remove"
                  size={24}
                  color="#E8E8E8"
                  style={{ backgroundColor: "#fff", borderRadius: 50 }}
                />
              </Pressable>
            </ImageBackground>
          </View>
          <Pressable
            style={{ position: "absolute", top: 24, right: 24 }}
            onPress={logOutHandler}
            title="LogOut"
            color="#fff"
          >
            <SimpleLineIcons
              name="logout"
              size={24}
              color="#BDBDBD"
              style={{ transform: [{ rotate: "180deg" }] }}
            />
          </Pressable>
          <Text style={styles.userLabel}>{displayName}</Text>
          <FlatList
            data={posts2}
            renderItem={({ item }) => (
              <PostItem data={item} navigation={navigation} />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBgImage: {
    flex: 1,
    resizeMode: "cover",
  },
  userImageBackground: { flex: 1 },

  userAvatar: {
    position: "absolute",
    width: 120,
    height: 120,
    top: -60,
    borderRadius: 16,
    overflow: "hidden",
  },
  delButton: {
    position: "absolute",
    bottom: 14,
    right: -12,
  },
  userLabel: {
    fontFamily: "Roboto",
    fontSize: 30,
    marginTop: 92,
    marginBottom: 32,
    fontWeight: "medium",
    textAlign: "center",
  },
  postItem: {
    justifyContent: "center",
    alignItems: "flex-start",
    marginBottom: 35,
  },
  postMeta: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default ProfileScreen;
