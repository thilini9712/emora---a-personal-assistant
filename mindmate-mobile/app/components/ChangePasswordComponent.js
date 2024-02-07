import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  Alert,
} from "react-native";

import colors from "../config/colors";
import { changePassword } from "../repository/ParentRepository";
import { AuthContext } from "../context/AuthContext";

function ChangePasswordComponent(props) {
  const { logout } = useContext(AuthContext);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [reEnterNewPassword, setReEnterNewPassword] = useState("");

  const sendRequest = async (e) => {
    const passwordDetails = {
      id: 1,
      currentPassword: currentPassword,
      newPassword: newPassword,
    };

    changePassword(passwordDetails)
      .then((res) => {
        if (res.status === 200) {
          if (res.data.success) {
            Alert.alert("Success!", res.data.message, [
              {
                text: "Ok",
                onPress: () => logout(),
                style: "default",
              },
            ]);
          } else {
            displayAlert("Error!", res.data.message);
          }
        } else {
          displayAlert("Error!", "Something Went Wrong");
        }
      })
      .catch((err) => console.log(err));
  };

  const refresh = () => {
    setCurrentPassword("");
    setNewPassword("");
    setReEnterNewPassword("");
  };

  const displayAlert = (title, message) => {
    Alert.alert(title, message, [
      {
        text: "Cancel",
        onPress: () => refresh(),
        style: "cancel",
      },
    ]);
  };
  const handleChangePasswordSubmit = async (e) => {
    if (newPassword !== reEnterNewPassword) {
      displayAlert("Error!", "Entered new passwords do not match");
    } else {
      Alert.alert("Are You Sure?", "Do you want to change the password?", [
        {
          text: "Yes",
          onPress: () => sendRequest(),
          style: "cancel",
        },
        { text: "No", onPress: () => refresh() },
      ]);
    }
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View>
        <View style={styles.changePassword}>
          <Text style={styles.changePasswordTitle}>Change Password</Text>
          <View style={styles.changePasswordForm}>
            <View style={styles.formFieldFull}>
              <Text style={styles.label}>Current Password</Text>
              <TextInput
                style={styles.formInput}
                placeholder={"Enter Current Password"}
                autoCapitalize={"none"}
                autoCorrect={false}
                textContentType={"password"}
                value={currentPassword}
                onChangeText={(text) => setCurrentPassword(text)}
              ></TextInput>
            </View>

            <View style={styles.formFieldFull}>
              <Text style={styles.label}>New Password</Text>
              <TextInput
                style={styles.formInput}
                placeholder={"Enter New Password"}
                autoCapitalize={"none"}
                autoCorrect={false}
                textContentType={"password"}
                value={newPassword}
                onChangeText={(text) => setNewPassword(text)}
              ></TextInput>
            </View>

            <View style={styles.formFieldFull}>
              <Text style={styles.label}>Re-enter New Password</Text>
              <TextInput
                style={styles.formInput}
                placeholder={"Re-enter New Password"}
                autoCapitalize={"none"}
                autoCorrect={false}
                textContentType={"password"}
                value={reEnterNewPassword}
                onChangeText={(text) => setReEnterNewPassword(text)}
              ></TextInput>
            </View>
          </View>
          <TouchableHighlight
            style={styles.updateButton}
            onPress={handleChangePasswordSubmit}
          >
            <Text style={styles.updateButtonText}>Update</Text>
          </TouchableHighlight>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  formFieldFull: {
    width: "96%",
    padding: 10,
  },
  formFieldHalf: {
    width: "48%",
    padding: 10,
  },
  formInput: {
    width: "98%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#D8D8D8",
    height: 40,
    fontSize: 16,
    color: colors.ash,
    borderRadius: 10,
    fontFamily: "LatoLight",
  },
  label: {
    fontFamily: "LatoRegular",
    fontSize: 15,
    color: colors.black,
    marginBottom: 5,
  },
  changePassword: {
    width: "100%",
    margin: 10,
    marginBottom: 0,
  },
  changePasswordForm: {
    marginLeft: 10,
  },
  changePasswordTitle: {
    fontFamily: "LatoBold",
    fontSize: 20,
    margin: 10,
  },
  scrollView: {},
  updateButton: {
    left: "25%",
    width: "50%",
    height: 50,
    marginTop: "5%",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.updateButtonColor,
  },
  updateButtonText: {
    color: colors.white,
    fontSize: 14,
    fontFamily: "LatoBold",
  },
});

export default ChangePasswordComponent;
