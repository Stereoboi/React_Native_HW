import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { ImageBackground, StyleSheet, View, Text } from "react-native";
import LoginScreen from "./screens/LoginScreen/loginScreen";
import RegistrationScreen from "./screens/RegistrationScreen/registrationScreen";

export default function App() {
  const [isLoginPage, setIsLoginPage] = useState(true);

  const toggleScreen = () => {
    setIsLoginPage(!isLoginPage);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ImageBackground
        source={require("./assets/img/backgroundPhoto_opt.jpg")}
        style={styles.image}
      >
        {isLoginPage && <LoginScreen switchScreen={toggleScreen} />}
        {!isLoginPage && <RegistrationScreen switchScreen={toggleScreen} />}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
});
