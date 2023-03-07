import { View } from "react-native";
import styled from "styled-components";

const AuthSubContainer = styled(View)`
  position: relative;
  height: ${(props) => (props.isProfilePage ? `100%` : `auto`)};
  width: ${(props) => props.screenWidth || `auto`};
  align-items: center;
  padding: ${(props) => (props.isLoginPage ? `32px 0 144px` : `92px 0 78px`)};
  background-color: #fff;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
`;

export default AuthSubContainer;
