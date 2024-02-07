import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  Dimensions,
  Image,
  Alert,
} from "react-native";
import { TabBar, TabView } from "react-native-tab-view";
import { Picker } from "@react-native-picker/picker";
import MoodPreferencesComponent from "../components/MoodPreferencesComponent";
import colors from "../config/colors";
import { useDispatch, useSelector } from "react-redux";
import { selectChildById, updateChild } from "../store/slices/childSlice";
import { updateChildDetails } from "../repository/ChildRepository";

function ChildProfileComponent(props) {
  const dispatcher = useDispatch();
  const child = useSelector((state) => selectChildById(state, 1));

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [emergencyContactNumber, setEmergencyContactNumber] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");

  useEffect(() => {
    if (child) {
      refresh(child);
    }
  }, [child]);

  const refresh = (child) => {
    setFirstName(child.firstName);
    setLastName(child.lastName);
    setAddress(child.address);
    setEmergencyContactNumber(child.emergencyContactNumber);
    setGender(child.gender);
    setAge(child.age);
  };

  const sendUpdateRequest = async (e) => {
    const childDetails = {
      id: child.id,
      firstName: firstName,
      lastName: lastName,
      address: address,
      emergencyContactNumber: emergencyContactNumber,
      gender: gender,
      age: age,
    };

    updateChildDetails(childDetails)
      .then((res) => {
        if (res.status === 200) {
          if (res.data.success) {
            dispatcher(updateChild(childDetails));
            Alert.alert("Success", res.data.message, [
              {
                text: "Ok",
                onPress: () => refresh(childDetails),
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

  const handleChildUpdateSubmit = async (e) => {
    Alert.alert("Are You Sure?", "Do you want to update the child details?", [
      {
        text: "Yes",
        onPress: () => sendUpdateRequest(),
        style: "cancel",
      },
      { text: "No", onPress: () => refresh(child) },
    ]);
  };

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {
      key: "happy",
      title: "Happy",
      image: require("../assets/emotions/happy.png"),
    },
    {
      key: "suprised",
      title: "Suprised",
      image: require("../assets/emotions/suprised.png"),
    },
    {
      key: "sad",
      title: "Sad",
      image: require("../assets/emotions/sad.png"),
    },
    {
      key: "fear",
      title: "Fear",
      image: require("../assets/emotions/fear.png"),
    },
    {
      key: "anger",
      title: "Anger",
      image: require("../assets/emotions/angry.png"),
    },
    {
      key: "disgust",
      title: "Disgust",
      image: require("../assets/emotions/disgust.png"),
    },
    {
      key: "neutral",
      title: "Neutral",
      image: require("../assets/emotions/neutral.png"),
    },
  ]);

  const renderScene = ({ route }) => {
    return <MoodPreferencesComponent mood={route.title} />;
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View>
        <View style={styles.profile}>
          <Text style={styles.profileTitle}>
            {child === undefined ? "Child" : firstName}'s Profile
          </Text>
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
                  value={age.toString()}
                  onChangeText={(text) => setAge(text)}
                ></TextInput>
              </View>
            </View>
          </View>
          <TouchableHighlight
            style={styles.updateDetailsButton}
            onPress={handleChildUpdateSubmit}
          >
            <Text style={styles.updateDetailsButtonText}>Update Details</Text>
          </TouchableHighlight>
        </View>

        <View style={styles.preferences}>
          <Text style={styles.preferencesTitle}>
            {child === undefined
              ? "Child"
              : gender === "FEMALE"
              ? "Her "
              : "His "}
            Preferences
          </Text>
          <Text style={styles.preferencesDescription}>
            We need some resources to use for{" "}
            {child === undefined ? "Child" : firstName} when
            {child === undefined
              ? "Child"
              : gender === "FEMALE"
              ? "she "
              : "he "}
            is in different moods
          </Text>
          <TabView
            style={styles.emotionsTab}
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: Dimensions.get("window").width }}
            renderTabBar={(props) => (
              <TabBar
                {...props}
                renderLabel={({ route, color }) => (
                  <Image source={route.image} style={styles.emotionTabImage} />
                )}
                indicatorStyle={styles.indicatorStyle}
                style={styles.tabBar}
              />
            )}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  emotionsTab: {
    width: Dimensions.get("window").width - 40,
    height: 500,
    top: 0,
    backgroundColor: colors.white,
  },
  emotionTabImage: {
    width: 30,
    height: 30,
  },
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
  },
  indicatorStyle: {
    backgroundColor: colors.primary,
    padding: 1.5,
    marginBottom: -2,
  },

  label: {
    fontFamily: "LatoRegular",
    fontSize: 15,
    color: colors.black,
    marginBottom: 5,
  },
  preferences: {
    width: "100%",
    margin: 10,
    marginTop: 0,
    padding: 10,
  },
  preferencesDescription: {
    fontFamily: "LatoLight",
    marginTop: 10,
    marginBottom: 10,
  },
  preferencesTitle: {
    fontFamily: "LatoBold",
    fontSize: 20,
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
  tabBar: {
    backgroundColor: colors.white,
  },
  updateDetailsButton: {
    left: "25%",
    width: "50%",
    height: "10%",
    marginTop: "5%",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.updateButtonColor,
  },
  updateDetailsButtonText: {
    color: colors.white,
    fontSize: 14,
    fontFamily: "LatoBold",
  },
});

export default ChildProfileComponent;
