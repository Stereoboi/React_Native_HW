import { ImageBackground } from "react-native";
import styled from "styled-components";

const AuthAvatarIcon = styled(ImageBackground)`
    transform: ${(props) => (props.isFilled ? `rotate(45deg)` : `rotate(0deg)`)};
    position: absolute;
    width: 25px;
    height: 25px;
    right: -12px;
    bottom: 14px;
`;

export default AuthAvatarIcon;
