import React, { useState } from "react";
import {
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import {
  AuthContainer,
  AuthBackground,
  AuthSubContainer,
  AuthTextContainer,
  AuthPageText,
  AuthInputContainer,
  AuthInput,
  AuthNavBtn,
  AuthNavText,
  AuthNavLink,
} from "../../ui/auth";

const initialState = { email: "", password: "" };

const calculatedScreenWidth = `${Math.floor(
  Dimensions.get("window").width - 32
)}px`;

export default function LoginScreen({ navigation, route }) {

  const [state, setState] = useState(initialState);

  const [isEmailInFocus, setIsEmailInFocus] = useState(false);
  const [isPasswordInFocus, setIsPasswordInFocus] = useState(false);

  const emailHandler = (value) =>
    setState((prevState) => ({ ...prevState, email: value }));
  const passwordHandler = (value) =>
    setState((prevState) => ({ ...prevState, password: value }));

  const onInputFocus = (name) => {
    switch (name) {
      case "email":
        setIsEmailInFocus(true);
        break;
      case "password":
        setIsPasswordInFocus(true);
        break;
      default:
        alert("Something went wrong...");
        return;
    }
  };

  const onInputBlur = (name) => {
    switch (name) {
      case "email":
        setIsEmailInFocus(false);
        break;
      case "password":
        setIsPasswordInFocus(false);
        break;
      default:
        alert("Something went wrong...");
        return;
    }
  };

  const onScreenPress = () => {
    Keyboard.dismiss();
  };

  const onLogin = () => {
    console.log("Credentials:", state);
    setState(initialState);
    route.params.LogIn();
  };

  const onLinkPress = () => {
    console.log("Sending to registration form...");
    navigation.navigate("Register");
  };

  return (
    <TouchableWithoutFeedback onPress={onScreenPress}>
      <AuthContainer>
        <AuthBackground
          source={require("../../assets/img/backgroundPhoto_opt.jpg")}
        >
          <AuthSubContainer isLoginPage>
            <AuthTextContainer>
              <AuthPageText>Увійти</AuthPageText>
            </AuthTextContainer>
            <KeyboardAvoidingView
              behavior={Platform.OS == "ios" ? "padding" : ""}
            >
              <AuthInputContainer screenWidth={calculatedScreenWidth}>
                <AuthInput
                  value={state.email}
                  onChangeText={emailHandler}
                  placeholder="Адреса елекронної скриньки"
                  onFocus={() => onInputFocus("email")}
                  onBlur={() => onInputBlur("email")}
                  isInFocus={isEmailInFocus}
                />
              </AuthInputContainer>
              <AuthInputContainer
                screenWidth={calculatedScreenWidth}
                extraMargin
              >
                <AuthInput
                  value={state.password}
                  onChangeText={passwordHandler}
                  placeholder="Пароль"
                  secureTextEntry={true}
                  onFocus={() => onInputFocus("password")}
                  onBlur={() => onInputBlur("password")}
                  isInFocus={isPasswordInFocus}
                />
              </AuthInputContainer>
            </KeyboardAvoidingView>
            <AuthNavBtn
              onPress={onLogin}
              activeOpacity={0.5}
              screenWidth={calculatedScreenWidth}
            >
              <AuthNavText>Увійти</AuthNavText>
            </AuthNavBtn>
            <AuthNavLink onPress={onLinkPress} activeOpacity={0.5}>
              <AuthNavText link>Немає акаунта? Зареєструватися</AuthNavText>
            </AuthNavLink>
          </AuthSubContainer>
        </AuthBackground>
      </AuthContainer>
    </TouchableWithoutFeedback>
  );
}
