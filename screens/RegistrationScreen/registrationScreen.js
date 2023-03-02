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
  ImageBackground,
} from "react-native";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function RegistrationScreen(props) {
  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keyboardIsShown, setKeyboardIsShown] = useState(false);

  const [isNameInFocus, setIsNameInFocus] = useState(false);
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

  const nameHandler = (text) => setName(text);
  const emailHandler = (text) => setEmail(text);
  const passwordHandler = (text) => setPassword(text);

  const onNameInputFocus = () => {
    setKeyboardIsShown(true);
    setIsNameInFocus(true);
  };

  const onNameInputBlur = () => {
    setIsNameInFocus(false);
  };

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

  const onAvatarAddPress = () => {
    console.log("Here is url link...");
    setAvatar("Avatar url");
  };

  const onRegister = () => {
    console.log(
      "RegistrationFormData:",
      `${avatar} + ${name} + ${email} + ${password}`
    );
    setAvatar("");
    setName("");
    setEmail("");
    setPassword("");
  };

  const onLinkPress = () => {
    console.log("Sending to login form...");
    props.switchScreen();
  };

  return (
    <TouchableWithoutFeedback onPress={onScreenPress}>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <View
          style={{
            ...styles.subContainer,
            marginBottom: keyboardIsShown ? 180 : 0,
          }}
        >
          <TouchableOpacity
            onPress={onAvatarAddPress}
            style={styles.avatarContainer}
            activeOpacity={0.5}
          >
            <View style={styles.avatarAddPlaceholder}></View>
            <ImageBackground
              source={require("../../assets/img/add_opt.png")}
              resizeMode="cover"
              style={styles.avatarAddIcon}
            ></ImageBackground>
          </TouchableOpacity>
          <View style={styles.textContainer}>
            <Text style={styles.introText}>Реєстрація</Text>
          </View>
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : ""}
          >
            <View>
              <TextInput
                value={name}
                onChangeText={nameHandler}
                placeholder="Ваше ім'я"
                style={{
                  ...styles.input,
                  borderColor: isNameInFocus ? "#FF6C00" : "#fff",
                  backgroundColor: isNameInFocus ? "#fff" : "#F6F6F6",
                  color: isNameInFocus ? "#000" : "#bdbdbd",
                }}
                onFocus={onNameInputFocus}
                onBlur={onNameInputBlur}
              />
            </View>
            <View style={{ marginTop: 16 }}>
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
            onPress={onRegister}
            activeOpacity={0.5}
          >
            <Text style={styles.buttonText}>Увійти</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onLinkPress} activeOpacity={0.5}>
            <Text style={styles.linkText}>Уже є акаунт? Увійти</Text>
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
    paddingTop: 263,
    fontSize: 20,
    height: "100%",
    width: "100%",
  },
  subContainer: {
    position: "relative",
    alignItems: "center",
    paddingTop: 92,
    paddingHorizontal: 16,
    backgroundColor: "#ffffff",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    height: "100%",
    width: "100%",
  },
  avatarContainer: {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    top: -60,
    left: 128,
  },
  avatarAddPlaceholder: {
    backgroundColor: "#F6F6F6",
    width: 132,
    height: 120,
    borderRadius: 16,
  },
  avatarAddIcon: {
    position: "absolute",
    width: 25,
    height: 25,
    right: -12,
    bottom: 14,
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
