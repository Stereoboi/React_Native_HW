import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  PostsContainer,
  PostsOwnerContainer,
  PostsOwnerAvatar,
  PostsOwnerInfoContainer,
  PostsOwnerInfoText,
  PostsListContainer,
  PostsItemContainer,
  PostsItemImg,
  PostsItemDescription,
  PostsItemSubContainer,
  PostsItemDetailsContainer,
  PostsItemIcon,
  PostsItemResponsesAmount,
} from "../../ui/main";

import userData from "../../testData/userData";
import commentIcon from "../../assets/img/commentIcon_opt.png";
import commentIconFilled from "../../assets/img/commentIconFilled_opt.png";
import locationIcon from "../../assets/img/locationIcon_opt.png";

export default function PostsScreen() {
  const navigation = useNavigation();

  const navigateToComments = (id) => {
    navigation.navigate("Коментарі", { id });
  };

  const navigateToLocation = () => {
    navigation.navigate("Мапа");
  }

  return (
    <PostsContainer>
      <PostsOwnerContainer>
        <PostsOwnerAvatar
          source={userData.userAvatar}
          resizeMode="cover"
        ></PostsOwnerAvatar>
        <PostsOwnerInfoContainer>
          <PostsOwnerInfoText isBold>{userData.name}</PostsOwnerInfoText>
          <PostsOwnerInfoText>{userData.email}</PostsOwnerInfoText>
        </PostsOwnerInfoContainer>
      </PostsOwnerContainer>
      <PostsListContainer>
        {userData.userPosts.map(
          ({ id, image, description, comments, imgLocation }) => {
            const { amountOfComments } = comments;

            return (
              <PostsItemContainer key={id}>
                <PostsItemImg source={image}></PostsItemImg>
                <PostsItemDescription>{description}</PostsItemDescription>
                <PostsItemSubContainer>
                  <PostsItemDetailsContainer
                    activeOpacity={0.5}
                    onPress={() => navigateToComments(id)}
                  >
                    <PostsItemIcon
                      source={
                        amountOfComments ? commentIconFilled : commentIcon
                      }
                    ></PostsItemIcon>
                    <PostsItemResponsesAmount
                      textIsHighlighted={amountOfComments !== 0}
                    >
                      {amountOfComments}
                    </PostsItemResponsesAmount>
                  </PostsItemDetailsContainer>
                  <PostsItemDetailsContainer onPress={() => navigateToLocation()} flexGrow activeOpacity={0.5}>
                    <PostsItemIcon source={locationIcon}></PostsItemIcon>
                    <PostsItemResponsesAmount
                      isLink
                      textIsHighlighted={imgLocation !== ""}
                    >
                      {imgLocation}
                    </PostsItemResponsesAmount>
                  </PostsItemDetailsContainer>
                </PostsItemSubContainer>
              </PostsItemContainer>
            );
          }
        )}
      </PostsListContainer>
    </PostsContainer>
  );
}
