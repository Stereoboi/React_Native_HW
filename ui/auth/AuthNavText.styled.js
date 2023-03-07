import { Text } from "react-native";
import styled from "styled-components";

const AuthNavText = styled(Text)`
    font-family: "Roboto-Regular";
    text-align: center;
    color: ${(props) => (props.link ? `#1b4371` : `#fff`)};
    font-size: 16px;
    line-height: 19px;
`

export default AuthNavText