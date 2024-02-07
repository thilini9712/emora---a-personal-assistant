import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableHighlight,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import colors from "../config/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

async function getIsSignedIn() {
  const userToken = await AsyncStorage.getItem("rfwef");
  return userToken !== null;
}

function WelcomeScreen(props) {
  const navigation = useNavigation();
  const [timePassed, setTimePassed] = useState(false);

  setTimeout(function () {
    setTimePassed(true);
  }, 1000);

  if (!timePassed) {
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require("../assets/logo.png")} />
        <Text style={styles.welcomeMessage}>Welcome Back</Text>
        <Image style={styles.robot} source={require("../assets/robot.png")} />
        {/* <TouchableHighlight
          style={styles.getStartedButton}
          onPress={() => console.log("Get Started Button Pressed")}
        >
          <Text style={styles.getStartedButtonText}>Get Started</Text>
        </TouchableHighlight> */}
      </View>
    );
  }

  navigation.navigate("Login");
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  getStartedButton: {
    margin: 10,
    backgroundColor: colors.white,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 20,
  },
  getStartedButtonText: {
    color: colors.primary,
    fontSize: 15,
    fontFamily: "LatoBold",
  },
  logo: {
    width: 150,
    height: 40,
  },
  robot: {
    width: 150,
    height: 150,
  },
  welcomeMessage: {
    fontSize: 30,
    padding: 10,
    color: "#fff",
    fontFamily: "LatoBlack",
  },
});

export default WelcomeScreen;
