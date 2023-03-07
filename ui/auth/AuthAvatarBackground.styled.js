import { ImageBackground } from "react-native";
import styled from "styled-components";

const AuthAvatarBackground = styled(ImageBackground)`
    background-color: ${(props) => (props.isFilled ? `#ff6c00` : `#F6F6F6`)};
    overflow: hidden;
    width: 132px;
    height: 120px;
    border-radius: 16px;
`

export default AuthAvatarBackground