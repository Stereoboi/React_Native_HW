import { View } from "react-native";
import styled from "styled-components";

const AuthInputContainer = styled(View)`
  width: ${(props) => props.screenWidth || `auto`};
  margin-bottom: ${(props) => (props.extraMargin ? `43px` : `16px`)};
`;

export default AuthInputContainer;
