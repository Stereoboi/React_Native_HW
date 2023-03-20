import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { collection, onSnapshot } from "firebase/firestore";
import { firestore } from "../../firebase/config";

import { StyleSheet, View, Image, Text, FlatList } from "react-native";
import PostItemSimple from "../../components/PostItemSimple/PostItemSimple";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import {
  selectDisplayName,
  selectUserEmail,
  selectUserPhotoURL,
} from "../../redux/auth/auth.selectors";

const DefaultPhotoScreen = ({ navigation, route }) => {
  const [posts, setPosts] = useState([]);

  const displayName = useSelector(selectDisplayName);
  const email = useSelector(selectUserEmail);
  const photoURL = useSelector(selectUserPhotoURL);

  const getAllPosts = async () => {
    const firestoreRef = collection(firestore, "posts");
    onSnapshot(firestoreRef, (querySnapshot) => {
      const postsFromDB = [];
      querySnapshot.forEach((doc) =>
        postsFromDB.push({ ...doc.data(), id: doc.id })
      );
      console.log(postsFromDB);
      setPosts(postsFromDB);
    });
  };
  useEffect(() => {
    if (route.params) setPosts((prevState) => [...prevState, route.params]);
  }, [route.params]);

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <View style={styles.postsContainer}>
      <Pressable onPress={() => navigation.navigate("Profile")}>
        <View style={styles.userContainer}>
          <Image source={{ uri: photoURL }} style={styles.userImage} />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{displayName}</Text>
            <Text style={styles.userEmail}>{email}</Text>
          </View>
        </View>
      </Pressable>
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <PostItemSimple data={item} navigation={navigation} />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  postsContainer: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  userContainer: {
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
  },
  userImage: {
    width: 60,
    height: 60,
    borderRadius: 16,
    marginRight: 8,
  },
  userInfo: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  userName: {
    textAlign: "left",
    fontFamily: "Roboto",
    fontWeight: "700",
    fontSize: 13,
  },
  userEmail: {
    textAlign: "left",
    fontFamily: "Roboto",
    fontWeight: "400",
    fontSize: 11,
  },
});

export default DefaultPhotoScreen;
