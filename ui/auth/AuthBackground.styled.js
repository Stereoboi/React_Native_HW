import { ImageBackground } from "react-native";
import styled from "styled-components";

const AuthBackground = styled(ImageBackground)`
flex: 1;
background-size: cover;
/* justify-content: flex-end; */
justify-content: ${(props) => (props.isProfilePage ? `flex-start` : `flex-end`)};
padding-top: ${(props) => (props.isProfilePage ? `147px` : `0`)};
align-items: stretch;
padding-bottom: ${(props) => (props.keyboardIsShown ? `72px` : `0`)};
`

export default AuthBackground