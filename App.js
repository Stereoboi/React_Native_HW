// import { useCallback } from "react";
// import { useFonts } from "expo-font";
// import * as SplashScreen from "expo-splash-screen";
// SplashScreen.preventAutoHideAsync();
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import Main from "./src/components/Main";

const App = () => {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
};

export default App;
