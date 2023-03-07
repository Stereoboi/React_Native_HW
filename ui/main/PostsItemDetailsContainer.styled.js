import { TouchableOpacity } from "react-native";
import styled from "styled-components";

const PostsItemDetailsContainer = styled(TouchableOpacity)`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin-left: ${(props) => (props.marginLeft ? `24px` : `0`)};
  flex-grow: ${(props) => (props.flexGrow ? `1` : `0`)};
`;

export default PostsItemDetailsContainer;
