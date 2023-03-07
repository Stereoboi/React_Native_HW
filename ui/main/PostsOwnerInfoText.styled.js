import { Text } from "react-native";
import styled from "styled-components";

const PostsOwnerInfoText = styled(Text)`
  color: #212121;
  font-family: ${(props) =>
    props.isBold ? `"Roboto-Bold"` : `"Roboto-Medium"`};
  font-weight: ${(props) => (props.isBold ? `700` : `400`)};
  font-size: ${(props) => (props.isBold ? `13px` : `11px`)};
  line-height: ${(props) => (props.isBold ? `15px` : `13px`)};
`;

export default PostsOwnerInfoText;
