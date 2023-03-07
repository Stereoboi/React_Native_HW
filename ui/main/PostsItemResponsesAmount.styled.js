import { Text } from "react-native";
import styled from "styled-components";

const PostsItemResponsesAmount = styled(Text)`
  font-family: "Roboto-Regular";
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  text-decoration: ${(props) => (props.isLink ? `underline` : `none`)};
  color: ${(props) => (props.textIsHighlighted ? `#000` : `#bdbdbd`)};
`;

export default PostsItemResponsesAmount;
