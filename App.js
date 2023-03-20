// import { useCallback } from "react";
// import { useFonts } from "expo-font";
// import * as SplashScreen from "expo-splash-screen";
// SplashScreen.preventAutoHideAsync();
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Main from "./components/Main";

const App = () => {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
};

export default App;
