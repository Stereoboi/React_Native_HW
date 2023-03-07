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
  AuthAvatarBtn,
  AuthAvatarBackground,
  AuthAvatarIcon,
  AuthSubContainer,
  AuthTextContainer,
  AuthPageText,
  AuthInputContainer,
  AuthInput,
  AuthNavBtn,
  AuthNavText,
  AuthNavLink,
} from "../../ui/auth";

import userPlaceholder from "../../assets/img/User_opt.jpg";
import addAvatar from "../../assets/img/add_opt.png";
import removeAvatar from "../../assets/img/remove_opt.png";
import backgroundImg from "../../assets/img/backgroundPhoto_opt.jpg";

const initialState = { avatar: "NO", name: "", email: "", password: "" };

const calculatedScreenWidth = `${Math.floor(
  Dimensions.get("window").width - 32
)}px`;

export default function RegistrationScreen({ navigation, route }) {
  const [state, setState] = useState(initialState);
  const [avatarIsAdded, setAvatarIsAdded] = useState(false);

  const [isNameInFocus, setIsNameInFocus] = useState(false);
  const [isEmailInFocus, setIsEmailInFocus] = useState(false);
  const [isPasswordInFocus, setIsPasswordInFocus] = useState(false);

  const [keyboardIsShown, setKeyboardIsShown] = useState(false);

  const avatarHandler = () => {
    if (!avatarIsAdded) {
      setState((prevState) => ({ ...prevState, avatar: `YES` }));
      setAvatarIsAdded(!avatarIsAdded);
      return;
    }
    setState((prevState) => ({ ...prevState, avatar: `NO` }));
    setAvatarIsAdded(!avatarIsAdded);
    return;
  };

  const nameHandler = (value) =>
    setState((prevState) => ({ ...prevState, name: value }));
  const emailHandler = (value) =>
    setState((prevState) => ({ ...prevState, email: value }));
  const passwordHandler = (value) =>
    setState((prevState) => ({ ...prevState, password: value }));

  const onInputFocus = (name) => {
    setKeyboardIsShown(true);
    switch (name) {
      case "name":
        setIsNameInFocus(true);
        break;
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
      case "name":
        setIsNameInFocus(false);
        break;
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
    setKeyboardIsShown(false);
  };

  const onRegister = () => {
    console.log("Register data:", state);
    setState(initialState);
    route.params.LogIn();
  };

  const onLinkPress = () => {
    console.log("Sending to login form...");
    navigation.navigate("Login");
  };

  return (
    <TouchableWithoutFeedback onPress={onScreenPress}>
      <AuthContainer>
        <AuthBackground source={backgroundImg} keyboardIsShown={keyboardIsShown}>
          <AuthSubContainer>
            <AuthAvatarBtn onPress={() => avatarHandler()} activeOpacity={0.5}>
              <AuthAvatarBackground
                source={avatarIsAdded && userPlaceholder}
                isFilled={avatarIsAdded}
              ></AuthAvatarBackground>
              <AuthAvatarIcon
                source={avatarIsAdded ? removeAvatar : addAvatar}
                isFilled={avatarIsAdded}
                resizeMode="cover"
              ></AuthAvatarIcon>
            </AuthAvatarBtn>
            <AuthTextContainer>
              <AuthPageText>Реєстрація</AuthPageText>
            </AuthTextContainer>
            <KeyboardAvoidingView
              behavior={Platform.OS == "ios" ? "padding" : ""}
            >
              <AuthInputContainer screenWidth={calculatedScreenWidth}>
                <AuthInput
                  value={state.name}
                  onChangeText={nameHandler}
                  placeholder="Ваше ім'я"
                  onFocus={() => onInputFocus("name")}
                  onBlur={() => onInputBlur("name")}
                  isInFocus={isNameInFocus}
                />
              </AuthInputContainer>
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
              onPress={onRegister}
              activeOpacity={0.5}
              screenWidth={calculatedScreenWidth}
            >
              <AuthNavText>Зареєструватися</AuthNavText>
            </AuthNavBtn>
            <AuthNavLink onPress={onLinkPress} activeOpacity={0.5}>
              <AuthNavText link>Уже є акаунт? Увійти</AuthNavText>
            </AuthNavLink>
          </AuthSubContainer>
        </AuthBackground>
      </AuthContainer>
    </TouchableWithoutFeedback>
  );
}
