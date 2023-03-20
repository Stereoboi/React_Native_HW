import React from "react";
import { View, Image, Pressable, Text } from "react-native";

import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import {
  postImage,
  postLabel,
  commentsWrapper,
  locationLabel,
  postItem,
  metaWrapper,
  socialWrapper,
  socialLabel,
} from "./PostItem.styles";

const PostItem = ({ data, navigation }) => {
  const { id, postName, photo, location, comments, likes } = data;
  const locationInfo = `${location?.region || "невідомо"}`;
  const commentsHandler = () => {
    navigation.navigate("Comments", { id, photo });
  };
  const locationHandler = () => {
    navigation.navigate("Map", { location });
  };

  return (
    <View style={postItem}>
      <Image source={{ uri: photo }} style={postImage} />
      <Text style={postLabel}>{postName}</Text>
      <View style={metaWrapper}>
        <View style={socialWrapper}>
          <Pressable onPress={() => navigation.navigate("CommentsScreen")}>
            <View style={commentsWrapper}>
              <FontAwesome name="comment" size={18} color="#FF6C00" />
              <Text style={socialLabel}>{comments}</Text>
            </View>
          </Pressable>
          <View style={socialWrapper}>
            <Pressable>
              <Ionicons name="thumbs-up-outline" size={18} color="black" />
            </Pressable>
            <Text style={socialLabel}>{likes}</Text>
          </View>
        </View>
        <Pressable onPress={locationHandler}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Ionicons name="location-outline" size={18} color="#BDBDBD" />
            <Text style={locationLabel}>{location?.country || "невідомо"}</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default PostItem;
