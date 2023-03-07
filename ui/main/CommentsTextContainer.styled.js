import { View } from "react-native";
import styled from "styled-components";

const CommentsTextContainer = styled(View)`
  padding: 16px;
  background-color: rgba(0, 0, 0, 0.03);
  /* background-color: tomato; */
  border-radius: 6px;
  border-top-left-radius: ${(props) => (props.isOwner ? `6px` : `0`)};
  border-top-right-radius: ${(props) => (props.isOwner ? `0` : `6px`)};
  width: 99%;
`;

export default CommentsTextContainer;
