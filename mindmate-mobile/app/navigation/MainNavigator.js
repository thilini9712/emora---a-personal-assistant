import React, { useContext } from "react";
import AuthNavigator from "./AuthNavigator";
import { AuthContext } from "../context/AuthContext";
import { View } from "react-native";
import { ActivityIndicator } from "react-native";
import AppNavigator from "./AppNavigator";
import { NavigationContainer } from "@react-navigation/native";

function MainNavigator(props) {
  const { isLoading, userToken } = useContext(AuthContext);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }
  return (
    <NavigationContainer>
      {userToken !== null ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}

export default MainNavigator;
