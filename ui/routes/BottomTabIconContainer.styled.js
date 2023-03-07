import { View } from "react-native";
import styled from "styled-components";

const BottomTabIconContainer = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 15px;
  background-color: ${(props) => (props.isFocused ? `#FF6C00` : `#fff`)};
  height: 40px;
  width: 70px;
  border-radius: 20px;
`;

export default BottomTabIconContainer;