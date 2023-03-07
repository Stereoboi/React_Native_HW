import { ImageBackground } from "react-native";
import styled from "styled-components";

const PostsItemImg = styled(ImageBackground)`
  height: 240px;
  overflow: hidden;
  border-radius: 8px;
  margin-bottom: ${(props) => (props.isCommentPage ? `32px` : `8px`)};
  /* width: 100%; */
`;

export default PostsItemImg;
