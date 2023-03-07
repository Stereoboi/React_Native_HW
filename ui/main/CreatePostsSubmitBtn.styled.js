import { TouchableOpacity } from "react-native";
import styled from "styled-components";

const CreatePostsSubmitBtn = styled(TouchableOpacity)`
  width: ${(props) => props.screenWidth || `auto`};
  background-color: ${(props) => props.submitIsDisabled ? "#f6f6f6" : "#ff6c00"};
  border-radius: 100px;
  padding: 16px;
  margin-bottom: 44px;
`;

export default CreatePostsSubmitBtn;
