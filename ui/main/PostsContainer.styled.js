import { View } from "react-native";
import styled from "styled-components";

const PostsContainer = styled(View)`
  flex: 1;
  /* align-items: center; */
  background-color: #fff;
  padding: 32px 16px 0 16px;
  /* width: ${(props) => props.screenWidth || `auto`}; */
`;

export default PostsContainer;
