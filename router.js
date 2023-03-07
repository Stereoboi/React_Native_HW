import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "./screens/AuthScreen/LoginScreen";
import RegistrationScreen from "./screens/AuthScreen/RegistrationScreen";

import HomeScreen from "./screens/MainScreen/HomeScreen";

const AuthStack = createStackNavigator();

export const useRoute = (props) => {
  function LogIn() {
    console.log("Logging in");
    props.authHandler();
  }

  function LogOut() {
    console.log("Logging out");
    props.authHandler();
  }

  if (!props.isAuthorized) {
    return (
      <AuthStack.Navigator initialRouteName="Login">
        <AuthStack.Screen
          name="Login"
          options={{
            title: "Login screen",
            headerShown: false,
          }}
          component={LoginScreen}
          initialParams={{ LogIn: LogIn }}
        />
        <AuthStack.Screen
          name="Register"
          options={{ title: "Registration screen", headerShown: false }}
          component={RegistrationScreen}
          initialParams={{ LogIn: LogIn }}
        />
      </AuthStack.Navigator>
    );
  }

  return <HomeScreen LogOut={LogOut}/>;
};
