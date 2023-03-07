import { TouchableOpacity } from "react-native";
import styled from "styled-components";

const PostsPseudoHeaderIcon = styled(TouchableOpacity)`
  margin-right: ${(props) => (props.isPostsScreen ? `16px` : `0`)};
  margin-left: ${(props) => (props.isNotPostsScreen ? `16px` : `0`)};
`;

export default PostsPseudoHeaderIcon;
