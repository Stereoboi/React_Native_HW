import React, { useState, useEffect } from "react";

import {
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { EvilIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import noImgPlaceholder from "../../assets/img/postsScreenPlaceholderNoImage_opt.png";
import withImgPlaceholder from "../../assets/img/postsScreenPlaceholderWithImage_opt.png";

import testImg01 from "../../assets/img/postsImg01_opt.jpg";

import {
  PostsContainer,
  CreatePostsImgPlaceholderContainer,
  CreatePostsImgPlaceholder,
  CreatePostsImgPlaceholderIcon,
  CreatePostsImg,
  CreatePostsInfo,
  CreatePostsInputContainer,
  CreatePostsInput,
  CreatePostsRemoveIconContainer,
  CreatePostsSubmitBtn,
  CreatePostsSubmitText,
  CreatePostsLocationIconContainer,
  CreatePostsDetailsContainer,
} from "../../ui/main";

const calculatedScreenWidth = `${Math.floor(
  Dimensions.get("window").width - 32
)}px`;

const initialState = { img: "Some Pic", name: "", location: "" };

export default function CreatePostsScreen() {
  const [state, setState] = useState(initialState);
  const [imgIsAdded, setImgIsAdded] = useState(false);
  const [isNameInFocus, setIsNameInFocus] = useState(false);
  const [isLocationInFocus, setIsLocationInFocus] = useState(false);
  const [submitIsDisabled, setSubmitIsDisabled] = useState(true);
  const [keyboardIsShown, setKeyboardIsShown] = useState(false);

  useEffect(() => {
    if (state.img && state.name && state.location) {
      setSubmitIsDisabled(false);
    }
  });

  const imgHandler = () => {
    setImgIsAdded(!imgIsAdded);
  };

  const nameHandler = (value) =>
    setState((prevState) => ({ ...prevState, name: value }));
  const locationHandler = (value) =>
    setState((prevState) => ({ ...prevState, location: value }));

  const onInputFocus = (name) => {
    setKeyboardIsShown(true);
    switch (name) {
      case "name":
        setIsNameInFocus(true);
        break;
      case "location":
        setIsLocationInFocus(true);
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
      case "location":
        setIsLocationInFocus(false);
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

  const removeData = () => {
    setState(initialState);
    setSubmitIsDisabled(true);
    setImgIsAdded(false);
  };

  const onSubmit = () => {
    console.log("Post data:", state);
    setState(initialState);
    setSubmitIsDisabled(true);
    setImgIsAdded(false);
  };

  return (
    <TouchableWithoutFeedback onPress={onScreenPress}>
      <PostsContainer keyboardIsShown={keyboardIsShown}>
        <CreatePostsImgPlaceholderContainer onPress={imgHandler}>
          <CreatePostsImgPlaceholder>
            <CreatePostsImg source={imgIsAdded && testImg01}>
              <CreatePostsImgPlaceholderIcon
                source={imgIsAdded ? withImgPlaceholder : noImgPlaceholder}
              ></CreatePostsImgPlaceholderIcon>
            </CreatePostsImg>
          </CreatePostsImgPlaceholder>
          <CreatePostsInfo>
            {imgIsAdded ? "Редагувати фото" : "Завантажити фото"}
          </CreatePostsInfo>
        </CreatePostsImgPlaceholderContainer>
        <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : ""}>
          <CreatePostsDetailsContainer screenWidth={calculatedScreenWidth}>
            <CreatePostsInputContainer isInFocus={isNameInFocus}>
              <CreatePostsInput
                placeholder="Назва..."
                value={state.name}
                onChangeText={nameHandler}
                onFocus={() => onInputFocus("name")}
                onBlur={() => onInputBlur("name")}
                isInFocus={isNameInFocus}
              />
            </CreatePostsInputContainer>
            <CreatePostsInputContainer isInFocus={isLocationInFocus} isLastItem>
              <CreatePostsLocationIconContainer>
                <EvilIcons name="location" size={24} color="#bdbdbd" />
              </CreatePostsLocationIconContainer>
              <CreatePostsInput
                placeholder="Місцина..."
                value={state.location}
                onChangeText={locationHandler}
                onFocus={() => onInputFocus("location")}
                onBlur={() => onInputBlur("location")}
                isInFocus={isLocationInFocus}
              />
            </CreatePostsInputContainer>
          </CreatePostsDetailsContainer>
        </KeyboardAvoidingView>
        <CreatePostsSubmitBtn
          submitIsDisabled={submitIsDisabled}
          disabled={submitIsDisabled}
          screenWidth={calculatedScreenWidth}
          onPress={onSubmit}
        >
          <CreatePostsSubmitText submitIsDisabled={submitIsDisabled}>
            Опублікувати
          </CreatePostsSubmitText>
        </CreatePostsSubmitBtn>
        <CreatePostsRemoveIconContainer onPress={removeData}>
          <AntDesign name="delete" size={24} color="#bdbdbd" />
        </CreatePostsRemoveIconContainer>
      </PostsContainer>
    </TouchableWithoutFeedback>
  );
}
