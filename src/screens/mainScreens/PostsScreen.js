import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useDispatch } from "react-redux";
import { logOut } from "../../redux/auth/auth.operations";

import DefaultScreen from "../nestedPostScreens/DefaultScreen";
import CommentsScreen from "../nestedPostScreens/CommentsScreen";
import MapScreen from "../nestedPostScreens/MapScreen";

import { TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const NestedPostsScreen = createStackNavigator();

const PostsScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const logOutHandler = () => {
    dispatch(logOut());
  };

  return (
    <NestedPostsScreen.Navigator initialRouteName="DefaultPostScreen">
      <NestedPostsScreen.Screen
        options={{
          title: "Публікації",
          headerStyle,

          headerTitleStyle,
          headerTitleAlign: "center",
          headerRight: () => (
            <TouchableOpacity
              onPress={logOutHandler}
              title="Info"
              color="#fff"
              style={{ marginRight: 16 }}
            >
              <Ionicons name="ios-exit-outline" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
        }}
        name="DefaultPostScreen"
        component={DefaultScreen}
      />
      <NestedPostsScreen.Screen
        options={{
          title: "Коментарі",
          headerTitleStyle,
          headerTitleAlign: "center",

          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("DefaultPostScreen")}
              title="Назад"
              color="#fff"
              style={{ marginLeft: 16 }}
            >
              <Ionicons name="arrow-back-outline" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
        }}
        name="Comments"
        component={CommentsScreen}
      />
      <NestedPostsScreen.Screen
        options={{
          title: "Карта",
          headerTitleStyle,
          headerTitleAlign: "center",

          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("DefaultPostScreen")}
              title="Назад"
              color="#fff"
              style={{ marginLeft: 16 }}
            >
              <Ionicons name="arrow-back-outline" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
        }}
        name="Map"
        component={MapScreen}
      />
    </NestedPostsScreen.Navigator>
  );
};
const headerTitleStyle = {
  fontWeight: "500",
  fontSize: 17,
};
const headerStyle = {
  backgroundColor: "#fff",
  borderBottomWidth: 1,
  borderBottomColor: "rgba(0, 0, 0, 0.3)",
};

export default PostsScreen;
