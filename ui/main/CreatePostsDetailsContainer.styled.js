import { View } from "react-native";
import styled from "styled-components";

const CreatePostsDetailsContainer = styled(View)`
    width: ${(props) => props.screenWidth || `auto`};
`;

export default CreatePostsDetailsContainer;
