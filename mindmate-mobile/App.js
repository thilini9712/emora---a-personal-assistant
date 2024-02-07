import { useFonts } from "expo-font";
import { AuthProvider } from "./app/context/AuthContext";
import MainNavigator from "./app/navigation/MainNavigator";
import { store } from "./app/store/store";
import { Provider } from "react-redux";

export default function App() {
  const [loaded] = useFonts({
    LatoBlack: require("./app/assets/fonts/Lato/Lato-Black.ttf"),
    LatoBold: require("./app/assets/fonts/Lato/Lato-Bold.ttf"),
    LatoLight: require("./app/assets/fonts/Lato/Lato-Light.ttf"),
    LatoRegular: require("./app/assets/fonts/Lato/Lato-Regular.ttf"),
    LatoThin: require("./app/assets/fonts/Lato/Lato-Thin.ttf"),
  });
  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <AuthProvider>
        <MainNavigator />
      </AuthProvider>
    </Provider>
  );
}

//rsf - basic react native
//rnss - style sheet
