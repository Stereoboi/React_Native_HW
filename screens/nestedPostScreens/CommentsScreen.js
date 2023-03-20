import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { firestore } from "../../firebase/config";
import { selectDisplayName } from "../../redux/auth/auth.selectors";

import {
  ScrollView,
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Image,
} from "react-native";

import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

const CommentsScreen = ({ route }) => {
  const { id, photo } = route.params;

  const [comment, setComment] = useState("222");
  const [allComments, setAllcomments] = useState("");
  const displayName = useSelector(selectDisplayName);

  const sendCommentToServer = async () => {
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();

    try {
      const postsRef = doc(firestore, `posts`, id);

      await addDoc(collection(postsRef, "comments"), {
        comment,
        displayName,
        date,
        time,
      });
      //---------------------------------------------------------------------
    } catch (error) {
      console.log("error.message", error.message);
    }
  };

  const createComment = () => {
    sendCommentToServer();
    // setComment("");
    keyboardHide();
  };

  const getAllComents = async () => {
    try {
      const firestoreRef = doc(firestore, "posts", id);
      onSnapshot(collection(firestoreRef, "comments"), (docSnap) =>
        setAllcomments(docSnap.docs.map((doc) => ({ ...doc.data() })))
      );
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    getAllComents();
  }, []);

  const keyboardHide = () => {
    Keyboard.dismiss();
  };

  const renderItem = ({ item }) => (
    <View>
      <View style={styles.comment}>
        <Text>Користувач: {displayName}</Text>
        <Text>Коментар: {item.comment}</Text>
        <Text style={styles.date}>
          {item.date} о {item.time}
        </Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} nestedScrollEnabled={true}>
      <TouchableWithoutFeedback onPress={keyboardHide}>
        <View>
          <Image
            source={{ uri: photo }}
            style={{ height: 240, borderRadius: 8 }}
          />
          <View>
            <ScrollView horizontal={true}>
              <FlatList
                data={allComments}
                keyExtractor={allComments.id}
                renderItem={renderItem}
              />
            </ScrollView>
          </View>
          <View style={styles.inputContainer}>
            <View>
              <TextInput
                value={comment}
                onChangeText={setComment}
                placeholder="Коментувати..."
                style={styles.submitBtn}
              />
              <TouchableOpacity onPress={createComment}>
                <Ionicons
                  name="arrow-up-circle"
                  size={34}
                  color="#FF6C00"
                  style={styles.sendIcon}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    marginTop: 32,
    marginBottom: 32,
  },
  comment: {
    minWidth: 320,
    marginVertical: 8,
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "rgba(0, 0, 0, 0.03)",
    backgroundColor: "rgba(0, 0, 0, 0.03)",
  },
  date: {
    fontSize: 12,
    textAlign: "right",
    color: "grey",
  },
  submitBtn: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 32,
    padding: 16,
    height: 50,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "rgba(189, 189, 189, 1)",
    backgroundColor: "#FFFFFF",
  },
  sendIcon: {
    position: "absolute",

    right: 15,
    bottom: 8,
  },
  inputContainer: {
    marginHorizontal: 10,
    marginBottom: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    height: 50,
    fontSize: 16,
  },
});

export default CommentsScreen;
