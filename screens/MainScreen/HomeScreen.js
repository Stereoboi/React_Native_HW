import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";

import PostsScreen from "./PostsScreen";
import ProfileScreen from "./ProfileScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import CommentsScreen from "./CommentsScreen";
import MapScreen from "./MapScreen";

import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import {
  PostsPseudoHeaderContainer,
  PostsPseudoHeaderTitle,
  PostsPseudoHeaderIcon,
  PostsPseudoHeaderCommentsContainer
} from "../../ui/pagesHeaders";
import { BottomTabIconContainer } from "../../ui/routes";

const MainTab = createBottomTabNavigator();

function MainScreenPseudoHeader() {
  return (
    <PostsPseudoHeaderContainer isPostsScreen>
      <PostsPseudoHeaderTitle>Публікації</PostsPseudoHeaderTitle>
    </PostsPseudoHeaderContainer>
  );
}

function AddPostsScreenPseudoHeader() {
  return (
    <PostsPseudoHeaderContainer>
      <PostsPseudoHeaderTitle>Створити публікацію</PostsPseudoHeaderTitle>
    </PostsPseudoHeaderContainer>
  );
}

function CommentsScreenPseudoHeader() {
  return (
    <PostsPseudoHeaderCommentsContainer>
      <PostsPseudoHeaderTitle>Коментарі</PostsPseudoHeaderTitle>
    </PostsPseudoHeaderCommentsContainer>
  );
}

export default function HomeScreen({ LogOut }) {
  const navigation = useNavigation();

  const getBack = () => {
    navigation.goBack();
  };

  return (
    <MainTab.Navigator
      initialRouteName="Публікації"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 58,
          paddingHorizontal: 67,
        },
      }}
    >
      <MainTab.Screen
        name="Публікації"
        component={PostsScreen}
        options={{
          tabBarIcon: ({ focused, size, color }) => {
            return (
              <BottomTabIconContainer>
                <AntDesign name="appstore-o" size={size} color="#000" />
              </BottomTabIconContainer>
            );
          },
          headerRight: () => (
            <PostsPseudoHeaderIcon isPostsScreen onPress={LogOut}>
              <Feather name="log-out" size={24} color="#bdbdbd" />
            </PostsPseudoHeaderIcon>
          ),
          headerTitleStyle: {
            textAlign: "center",
          },
          headerTitle: (props) => <MainScreenPseudoHeader {...props} />,
        }}
      />
      <MainTab.Screen
        name="Створити публікацію"
        component={CreatePostsScreen}
        options={{
          tabBarIcon: ({ focused, size, color }) => {
            return (
              <BottomTabIconContainer isFocused>
                <AntDesign name="plus" size={size} color="#fff" />
              </BottomTabIconContainer>
            );
          },
          tabBarStyle: { display: "none" },
          headerLeft: () => (
            <PostsPseudoHeaderIcon isNotPostsScreen onPress={getBack}>
              <AntDesign name="arrowleft" size={24} color="#212121" />
            </PostsPseudoHeaderIcon>
          ),
          headerTitle: (props) => <AddPostsScreenPseudoHeader {...props} />,
        }}
      />
      <MainTab.Screen
        name="Профіль"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => {
            return (
              <BottomTabIconContainer>
                <Feather name="user" size={size} color="#000" />
              </BottomTabIconContainer>
            );
          },
        }}
        component={ProfileScreen}
        initialParams={{ LogOut }}
      />
      <MainTab.Screen
        name="Коментарі"
        component={CommentsScreen}
        options={{
          tabBarStyle: {
            display: "none",
          },
          tabBarItemStyle: {
            display: "none",
          },
          headerLeft: () => (
            <PostsPseudoHeaderIcon isNotPostsScreen onPress={getBack}>
              <AntDesign name="arrowleft" size={24} color="#212121" />
            </PostsPseudoHeaderIcon>
          ),
          headerTitle: (props) => <CommentsScreenPseudoHeader {...props} />,
        }}
      />
      <MainTab.Screen
        name="Мапа"
        component={MapScreen}
        options={{
          tabBarStyle: {
            display: "none",
          },
          tabBarItemStyle: {
            display: "none",
          },
          headerLeft: () => (
            <PostsPseudoHeaderIcon isNotPostsScreen onPress={getBack}>
              <AntDesign name="arrowleft" size={24} color="#212121" />
            </PostsPseudoHeaderIcon>
          ),
        }}
      />
    </MainTab.Navigator>
  );
}
