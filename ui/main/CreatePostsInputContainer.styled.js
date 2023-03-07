import { View } from "react-native";
import styled from "styled-components";

const CreatePostsInputContainer = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: ${(props) => (props.isLastItem ? `120px` : `16px`)};
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => (props.isInFocus ? `#000` : `#bdbdbd`)};
`;

export default CreatePostsInputContainer;
