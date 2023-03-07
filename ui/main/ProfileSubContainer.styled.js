import { View } from "react-native";
import styled from "styled-components";

const ProfileSubContainer = styled(View)`
  position: relative;
  height: 100%;
  width: ${(props) => props.screenWidth || `auto`};
  align-items: center;
  padding: 92px 16px 0;
  background-color: #fff;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
`;

export default ProfileSubContainer;
