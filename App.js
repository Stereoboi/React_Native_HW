// import { useCallback } from "react";
// import { useFonts } from "expo-font";
// import * as SplashScreen from "expo-splash-screen";
// SplashScreen.preventAutoHideAsync();

import { NavigationContainer } from "@react-navigation/native";
import { useRoute } from "./router";

const App = () => {
  // const [fontsLoaded] = useFonts({
  //   "Roboto": require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
  //   "ShantellSans-SemiBold": require("./assets/fonts/Shantell_Sans/ShantellSans-SemiBoldItalic.ttf"),
  // });

  // const onLayoutRootView = useCallback(async () => {
  //   if (fontsLoaded) {
  //     await SplashScreen.hideAsync();
  //   }
  // }, [fontsLoaded]);

  const routing = useRoute(false);
  return <NavigationContainer>{routing}</NavigationContainer>;
};

export default App;
