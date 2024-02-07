import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import WelcomeScreen from "../screens/WelcomeScreen";

//screen names
const welcomeName = "Welcome";
const loginName = "Login";

const Stack = createNativeStackNavigator();

function AuthNavigator(props) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={welcomeName} component={WelcomeScreen} />
      <Stack.Screen name={loginName} component={LoginScreen} />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
