import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  Alert,
  DevSettings,
} from "react-native";

import { Picker } from "@react-native-picker/picker";
import colors from "../config/colors";
import { AuthContext } from "../context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import {
  addParent,
  selectParentById,
  updateParent,
} from "../store/slices/parentSlice";
import { updateParentDetails } from "../repository/ParentRepository";

function UserProfileComponent() {
  const dispatcher = useDispatch();

  const parent = useSelector((state) => selectParentById(state, 1));

  const { logout } = useContext(AuthContext);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [emergencyContactNumber, setEmergencyContactNumber] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [relationship, setRelationship] = useState("");

  useEffect(() => {
    if (parent) {
      refresh(parent);
    }
  }, [parent]);

  const refresh = (parent) => {
    setFirstName(parent.firstName);
    setLastName(parent.lastName);
    setAddress(parent.address);
    setEmergencyContactNumber(parent.emergencyContactNumber);
    setGender(parent.gender);
    setAge(parent.age);
    setRelationship(parent.relationship);
  };

  const sendUpdateRequest = async (e) => {
    const parentDetails = {
      id: parent.id,
      firstName: firstName,
      lastName: lastName,
      address: address,
      emergencyContactNumber: emergencyContactNumber,
      gender: gender,
      age: age,
      relationship: relationship,
    };

    updateParentDetails(parentDetails)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          if (res.data.success) {
            dispatcher(updateParent(parentDetails));
            Alert.alert("Success", res.data.message, [
              {
                text: "Ok",
                onPress: () => refresh(parentDetails),
                style: "default",
              },
            ]);
          } else {
            Alert.alert("Error", res.data.message, [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
              },
            ]);
          }
        } else {
          Alert.alert("Error", "Something Went Wrong!", [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
          ]);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleParentUpdateSubmit = async (e) => {
    Alert.alert("Are You Sure?", "Do you want to update thr parent details?", [
      {
        text: "Yes",
        onPress: () => sendUpdateRequest(),
        style: "cancel",
      },
      { text: "No", onPress: () => refresh(parent) },
    ]);
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View>
        <View style={styles.profile}>
          <Text style={styles.profileTitle}>My Profile</Text>
          <View style={styles.profileForm}>
            <View style={styles.row}>
              <View style={styles.formFieldHalf}>
                <Text style={styles.label}>First Name</Text>
                <TextInput
                  style={styles.formInput}
                  placeholder={"Enter First Name"}
                  autoCapitalize={"none"}
                  autoCorrect={false}
                  textContentType={"name"}
                  value={firstName}
                  onChangeText={(text) => setFirstName(text)}
                ></TextInput>
              </View>

              <View style={styles.formFieldHalf}>
                <Text style={styles.label}>Last Name</Text>
                <TextInput
                  style={styles.formInput}
                  placeholder={"Enter Last Name"}
                  autoCapitalize={"none"}
                  autoCorrect={false}
                  textContentType={"name"}
                  value={lastName}
                  onChangeText={(text) => setLastName(text)}
                ></TextInput>
              </View>
            </View>

            <View style={styles.formFieldFull}>
              <Text style={styles.label}>Address</Text>
              <TextInput
                style={styles.formInput}
                placeholder={"Enter Address"}
                autoCapitalize={"none"}
                autoCorrect={false}
                textContentType={"name"}
                value={address}
                onChangeText={(text) => setAddress(text)}
              ></TextInput>
            </View>

            <View style={styles.formFieldFull}>
              <Text style={styles.label}>Emergency Contact Number</Text>
              <TextInput
                style={styles.formInput}
                placeholder={"Enter Emergency Contact Number"}
                autoCapitalize={"none"}
                autoCorrect={false}
                textContentType={"name"}
                value={emergencyContactNumber}
                onChangeText={(text) => setEmergencyContactNumber(text)}
              ></TextInput>
            </View>

            <View style={styles.row}>
              <View style={styles.formFieldHalf}>
                <Text style={styles.label}>Gender</Text>
                <View style={styles.formPicker}>
                  <Picker
                    selectedValue={gender}
                    onValueChange={(itemValue, itemIndex) =>
                      setGender(itemValue)
                    }
                  >
                    <Picker.Item label="Male" value="MALE" />
                    <Picker.Item label="Female" value="FEMALE" />
                  </Picker>
                </View>
              </View>
              <View style={styles.formFieldHalf}>
                <Text style={styles.label}>Age</Text>
                <TextInput
                  style={styles.formInput}
                  placeholder={"Enter Age"}
                  autoCapitalize={"none"}
                  autoCorrect={false}
                  keyboardType="numeric"
                  value={age + ""}
                  onChangeText={(text) => setAge(text)}
                ></TextInput>
              </View>
            </View>

            <View style={styles.formFieldFull}>
              <Text style={styles.label}>Relationship to Mihasa</Text>
              <TextInput
                style={styles.formInput}
                placeholder={"Enter Relationship"}
                autoCapitalize={"none"}
                autoCorrect={false}
                textContentType={"name"}
                value={relationship}
                onChangeText={(text) => setRelationship(text)}
              ></TextInput>
            </View>
          </View>
          <TouchableHighlight
            style={styles.profileButton}
            onPress={handleParentUpdateSubmit}
          >
            <Text style={styles.profileButtonText}>Update Details</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.signOutButton}
            onPress={() => {
              logout();
            }}
          >
            <Text style={styles.profileButtonText}>Sign Out</Text>
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
  formPicker: {
    borderWidth: 1,
    borderColor: "#D8D8D8",
    height: 40,
    fontSize: 16,
    color: colors.ash,
    borderRadius: 10,
    fontFamily: "LatoLight",
    justifyContent: "center",
  },
  label: {
    fontFamily: "LatoRegular",
    fontSize: 15,
    color: colors.black,
    marginBottom: 5,
  },
  profile: {
    width: "100%",
    margin: 10,
    marginBottom: 0,
  },
  profileForm: {
    marginLeft: 10,
  },
  profileTitle: {
    fontFamily: "LatoBold",
    fontSize: 20,
    margin: 10,
  },
  row: {
    flexDirection: "row",
  },
  scrollView: {
    marginBottom: 100,
  },
  profileButton: {
    left: "25%",
    width: "50%",
    height: 50,
    marginTop: "5%",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.updateButtonColor,
  },
  profileButtonText: {
    color: colors.white,
    fontSize: 14,
    fontFamily: "LatoBold",
  },
  signOutButton: {
    left: "25%",
    width: "50%",
    height: 50,
    marginTop: "5%",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.red,
  },
});

export default UserProfileComponent;
