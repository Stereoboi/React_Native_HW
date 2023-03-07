import { TouchableOpacity } from "react-native";
import styled from "styled-components";

const AuthNavBtn = styled(TouchableOpacity)`
  width: ${(props) => props.screenWidth || `auto`};
  background-color: #ff6c00;
  border-radius: 100px;
  padding: 16px;
  margin-bottom: 16px;
`;

export default AuthNavBtn;
