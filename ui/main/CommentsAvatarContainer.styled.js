import { ImageBackground } from "react-native";
import styled from "styled-components";

const CommentsAvatarContainer = styled(ImageBackground)`
 height: 28px;
 width: 28px;
 margin-right: ${(props) => (props.isOwner ? `0` : `16px`)};
 margin-left: ${(props) => (props.isOwner ? `16px` : `0`)};
`;

export default CommentsAvatarContainer;
