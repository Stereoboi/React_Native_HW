import { Text } from "react-native";
import styled from "styled-components";

const CreatePostsSubmitText = styled(Text)`
    font-family: "Roboto-Regular";
    text-align: center;
    color: ${(props) => (props.submitIsDisabled ? `#bdbdbd` : `#fff`)};
    font-size: 16px;
    line-height: 19px;
`

export default CreatePostsSubmitText