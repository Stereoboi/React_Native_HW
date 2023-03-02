import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";

import { useFonts } from 'expo-font';
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function LoginScreen(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keyboardIsShown, setKeyboardIsShown] = useState(false);

  const [isEmailInFocus, setIsEmailInFocus] = useState(false);
  const [isPasswordInFocus, setIsPasswordInFocus] = useState(false);

  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("../../assets/fonts/Roboto/Roboto-Regular.ttf"),
    "Roboto-Medium": require("../../assets/fonts/Roboto/Roboto-Medium.ttf"),
    "Roboto-Bold": require("../../assets/fonts/Roboto/Roboto-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const emailHandler = (text) => setEmail(text);
  const passwordHandler = (text) => setPassword(text);

  const onEmailInputFocus = () => {
    setKeyboardIsShown(true);
    setIsEmailInFocus(true);
  };

  const onEmailInputBlur = () => {
    setIsEmailInFocus(false);
  };

  const onPasswordInputFocus = () => {
    setKeyboardIsShown(true);
    setIsPasswordInFocus(true);
  };

  const onPasswordInputBlur = () => {
    setIsPasswordInFocus(false);
  };

  const onScreenPress = () => {
    Keyboard.dismiss();
    setKeyboardIsShown(false);
  };

  const onLogin = () => {
    console.log("Credentials", `${email} + ${password}`);
    setEmail("");
    setPassword("");
  };

  const onLinkPress = () => {
    console.log("Sending to registration form...");
    props.switchScreen()
  };

  return (
    <TouchableWithoutFeedback onPress={onScreenPress}>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <View
          style={{
            ...styles.subContainer,
            marginBottom: keyboardIsShown ? 50 : 0,
          }}
        >
          <View style={styles.textContainer}>
            <Text style={styles.introText}>Увійти</Text>
          </View>
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : ""}
          >
            <View>
              <TextInput
                value={email}
                onChangeText={emailHandler}
                placeholder="Адреса елекронної скриньки"
                style={{
                  ...styles.input,
                  borderColor: isEmailInFocus ? "#FF6C00" : "#fff",
                  backgroundColor: isEmailInFocus ? "#fff" : "#F6F6F6",
                  color: isEmailInFocus ? "#000" : "#bdbdbd",
                }}
                onFocus={onEmailInputFocus}
                onBlur={onEmailInputBlur}
              />
            </View>
            <View style={{ marginTop: 16 }}>
              <TextInput
                value={password}
                onChangeText={passwordHandler}
                placeholder="Пароль"
                secureTextEntry={true}
                style={{
                  ...styles.input,
                  borderColor: isPasswordInFocus ? "#FF6C00" : "#fff",
                  backgroundColor: isPasswordInFocus ? "#fff" : "#F6F6F6",
                  color: isPasswordInFocus ? "#000" : "#bdbdbd",
                }}
                onFocus={onPasswordInputFocus}
                onBlur={onPasswordInputBlur}
              />
            </View>
          </KeyboardAvoidingView>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={onLogin}
            activeOpacity={0.5}
          >
            <Text style={styles.buttonText}>Увійти</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onLinkPress} activeOpacity={0.5}>
            <Text style={styles.linkText}>Немає акаунта? Зареєструватися</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 320,
    fontSize: 20,
    height: "100%",
    width: "100%",
  },
  subContainer: {
    alignItems: "center",
    paddingVertical: 32,
    paddingHorizontal: 16,
    backgroundColor: "#ffffff",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    height: "100%",
    width: "100%",
  },
  textContainer: {
    marginBottom: 32,
  },
  introText: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
    letterSpacing: 0.01,
  },
  input: {
    fontFamily: "Roboto-Regular",
    width: 343,
    height: 50,
    padding: 16,
    borderWidth: 1,
    borderRadius: 10,
    textAlign: "left",
    backgroundColor: "#f6f6f6",
    borderColor: "#fff",
    color: "#bdbdbd",
    fontSize: 16,
    lineHeight: 19,
  },
  buttonContainer: {
    width: 343,
    backgroundColor: "#ff6c00",
    borderRadius: 100,
    padding: 16,
    marginTop: 43,
    marginBottom: 16,
  },
  buttonText: {
    fontFamily: "Roboto-Regular",
    textAlign: "center",
    color: "#ffffff",
    fontSize: 16,
    lineHeight: 19,
  },
  linkText: {
    fontFamily: "Roboto-Regular",
    textAlign: "center",
    color: "#1B4371",
    fontSize: 16,
    lineHeight: 19,
  },
});
