import { TextInput } from "react-native";
import styled from "styled-components";

const CreatePostsInput = styled(TextInput)`
  /* width: 100%; */
  padding: 16px 0;
  font-family: "Roboto-Regular";
  font-size: 16px;
  line-height: 19px;
  text-align: left;
  color: ${(props) => (props.isInFocus ? `#000` : `#bdbdbd`)};
`;

export default CreatePostsInput;
