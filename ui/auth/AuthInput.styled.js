import { TextInput } from "react-native";
import styled from "styled-components";

const AuthInput = styled(TextInput)`
  padding: 16px;
  font-family: "Roboto-Regular";
  font-size: 16px;
  line-height: 19px;
  text-align: left;
  border-width: 1px;
  border-radius: 10px;
  background-color: ${(props) => (props.isInFocus ? `#fff` : `#f6f6f6`)};
  border-color: ${(props) => (props.isInFocus ? `orange` : `#fff`)};
  color: ${(props) => (props.isInFocus ? `#000` : `#bdbdbd`)};
`;

export default AuthInput;
