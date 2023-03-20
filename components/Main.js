/* 
----------------FONTS PRESET ending------------------------
import { useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
SplashScreen.preventAutoHideAsync();
----------------FONTS PRESET ending------------------------
*/
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { NavigationContainer } from "@react-navigation/native";

import { useRoute } from "../router";
import { selectStateChange } from "../redux/auth/auth.selectors";
import { authStateCahngeUser } from "../redux/auth/auth.operations";

const Main = () => {
  /* 
----------------FONTS PRESET ending------------------------
const [fontsLoaded] = useFonts({
 // Roboto: require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
Roboto: require("./assets/fonts/Shantell_Sans/ShantellSans-SemiBoldItalic.ttf"),
});

const onLayoutRootView = useCallback(async () => {
if (fontsLoaded) {
await SplashScreen.hideAsync();
}
}, [fontsLoaded]);

if (!fontsLoaded) {
return null;
}
----------------FONTS PRESET ending------------------------
*/

  const stateChange = useSelector(selectStateChange);
  const routing = useRoute(stateChange);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authStateCahngeUser());
  }, []);

  return <NavigationContainer>{routing}</NavigationContainer>;
};

export default Main;
