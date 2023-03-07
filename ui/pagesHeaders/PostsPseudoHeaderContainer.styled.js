import { View } from "react-native";
import styled from "styled-components";

const PostsPseudoHeaderContainer = styled(View)`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding-left: ${(props) => (props.isPostsScreen ? `140px` : `60px`)};
`;

export default PostsPseudoHeaderContainer;
