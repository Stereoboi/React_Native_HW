import React from "react";
import { View, Image, Pressable, Text } from "react-native";

import { Ionicons, FontAwesome } from "@expo/vector-icons";

import {
  postImage,
  postLabel,
  commentsWrapper,
  locationLabel,
  locationWrapper,
  commentsInner,
  metaWrapper,
  commentsLabel,
  postItem,
} from "./PostItemSimple.styles";

const PostItemSimple = ({ data, navigation }) => {
  const { id, postName, photo, location, comments } = data;

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
        <View style={commentsInner}>
          <Pressable onPress={commentsHandler} style={commentsWrapper}>
            <FontAwesome name="comment-o" size={18} color="#BDBDBD" />
            <Text style={commentsLabel}>0</Text>
          </Pressable>
        </View>
        <Pressable onPress={locationHandler} style={locationWrapper}>
          <Ionicons name="location-outline" size={18} color="#BDBDBD" />
          <Text style={locationLabel}>{locationInfo}</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default PostItemSimple;
