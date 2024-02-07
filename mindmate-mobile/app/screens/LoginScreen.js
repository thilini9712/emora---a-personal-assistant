import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableHighlight,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from "react-native";
import { AuthContext } from "../context/AuthContext";

import colors from "../config/colors";

function LoginScreen({ navigation }) {
  const { login } = useContext(AuthContext);

  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = () => {
    login(username, password);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={require("../assets/logo.png")} />
      <View style={styles.signInFormContainer}>
        <Text style={styles.signInFormTitle}>Let's Sign In</Text>
        <View style={styles.signInForm}>
          <Text style={styles.signInFormText}>Username</Text>
          <TextInput
            style={styles.signInFormTextInput}
            placeholder={"Enter Username"}
            autoCapitalize={"none"}
            autoCorrect={false}
            textContentType={"name"}
            value={username}
            onChangeText={(text) => setUserName(text)}
          ></TextInput>
          <Text style={styles.signInFormText}>Password</Text>
          <TextInput
            style={styles.signInFormTextInput}
            placeholder={"Enter Password"}
            autoCapitalize={"none"}
            autoCorrect={false}
            secureTextEntry={true}
            textContentType={"password"}
            value={password}
            onChangeText={(text) => setPassword(text)}
          ></TextInput>
          <TouchableOpacity
            style={styles.forgotPassword}
            onPress={() => console.log("Forgot Password Pressed")}
          >
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
        <TouchableHighlight style={styles.signInButton} onPress={handleSubmit}>
          <Text style={styles.signInButtonText}>Sign In</Text>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: "center",
  },
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
  },
  forgotPasswordText: {
    fontSize: 15,
    fontFamily: "LatoLight",
    color: colors.ash,
  },
  signInForm: {
    alignItems: "flex-start",
    width: "80%",
  },
  signInFormContainer: {
    flex: 1,
    width: "100%",
    height: "60%",
    top: "40%",
    backgroundColor: colors.white,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    alignItems: "center",
  },
  signInFormText: {
    fontFamily: "LatoRegular",
    marginTop: 10,
    fontSize: 18,
  },
  signInFormTextInput: {
    width: "100%",
    borderTopWidth: 0,
    borderBottomWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    height: 40,
    marginBottom: 20,
    fontSize: 16,
    color: colors.ash,
  },
  signInFormTitle: {
    fontFamily: "LatoRegular",
    fontSize: 25,
    height: "5%",
    marginTop: "10%",
    marginBottom: "10%",
  },
  logo: {
    top: "30%",
    width: 180,
    height: 50,
  },
  signInButton: {
    width: "50%",
    height: 56,
    marginTop: "5%",
    marginBottom: "5%",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
  },
  signInButtonText: {
    color: colors.white,
    fontSize: 20,
    fontFamily: "LatoBold",
  },
});
export default LoginScreen;
