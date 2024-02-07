import React, { useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import colors from "../config/colors";
import { TabBar, TabView } from "react-native-tab-view";
import TimeTableDayViewComponent from "./TimeTableDayViewComponent";
import { Modal } from "react-native";
import { TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  addTimetableRecord,
  getTimetableRecordForDay,
  updateTimetableRecord,
} from "../repository/TimetableRepository";
import { useFocusEffect } from "@react-navigation/native";

function DailyTimetableComponent() {
  const [timeTableAdded, setTimeTableAdded] = useState(true);
  const [index, setIndex] = React.useState(0);
  const [routes] = useState([
    { key: "mon", title: "MON", color: "#D93250" },
    { key: "tue", title: "TUE", color: "#4D308C" },
    { key: "wed", title: "WED", color: "#1C71A6" },
    { key: "thu", title: "THU", color: "#F2C36B" },
    { key: "fri", title: "FRI", color: "#00AD76" },
    { key: "sat", title: "SAT", color: "#FF7C5B" },
    { key: "sud", title: "SUN", color: "#A68FD9" },
  ]);

  const renderScene = ({ route }) => {
    return (
      <TimeTableDayViewComponent
        day={route.title}
        color={route.color}
        setModalVisible={setModalVisible}
        setSelectedDay={setSelectedDay}
        setFromTime={setFromTime}
        setToTime={setToTime}
        setTask={setTask}
        setIsUpdate={setIsUpdate}
        setId={setId}
      />
    );
  };

  const [isUpdate, setIsUpdate] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);

  const [id, setId] = useState("");
  const [selectedDay, setSelectedDay] = useState();
  const [fromTime, setFromTime] = useState(new Date());
  const [toTime, setToTime] = useState(new Date());
  const [fromShow, setFromShow] = useState(false);
  const [toShow, setToShow] = useState(false);
  const [task, setTask] = useState("");

  const fromTimeOnChange = (event, selected) => {
    console.log(selected);
    const current = selected;
    setFromShow(false);
    setFromTime(current);
  };
  const toTimeOnChange = (event, selected) => {
    console.log(selected);
    const current = selected;
    setToShow(false);
    setToTime(current);
  };

  const showFromTimepicker = () => {
    setFromShow(true);
  };
  const showToTimepicker = () => {
    setToShow(true);
  };

  const refreshModal = () => {
    setIsUpdate(false);
    setSelectedDay("MON");
    setToTime(new Date());
    setFromTime(new Date());
    setTask("");
  };

  const getTimeStringFromDate = (date) => {
    const timeFormatter = new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    const timeString = timeFormatter.format(date);
    return timeString;
  };

  const sendRequest = async (e) => {
    const timetableRecord = {
      id: id,
      day: selectedDay,
      fromTime: getTimeStringFromDate(fromTime),
      toTime: getTimeStringFromDate(toTime),
      task: task,
      childId: 1,
    };

    if (isUpdate) {
      updateTimetableRecord(timetableRecord)
        .then((res) => {
          handleResponse(res);
        })
        .catch((err) => console.log(err));
    } else {
      addTimetableRecord(timetableRecord)
        .then((res) => {
          console.log(res);
          handleResponse(res);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleResponse = (res) => {
    if (res.status === 200) {
      if (res.data.success) {
        // dispatcher(updateParent(parentDetails));
        Alert.alert("Success", res.data.message, [
          {
            text: "Ok",
            onPress: () => {
              setModalVisible(!modalVisible);
              refreshModal();
            },
            style: "default",
          },
        ]);
      } else {
        Alert.alert("Error", res.data.message, [
          {
            text: "Ok",
            onPress: () => {
              setModalVisible(!modalVisible);
              refreshModal();
            },
            style: "cancel",
          },
        ]);
      }
    } else {
      Alert.alert("Error", "Something Went Wrong!", [
        {
          text: "Cancel",
          onPress: () => {
            setModalVisible(!modalVisible);
            refreshModal();
          },
          style: "cancel",
        },
      ]);
    }
  };

  const handleRecordSubmit = async (e) => {
    Alert.alert(
      "Are You Sure?",
      "Do you want to proceed with the time table change?",
      [
        {
          text: "Yes",
          onPress: () => sendRequest(),
          style: "cancel",
        },
        { text: "No", onPress: () => refreshModal() },
      ]
    );
  };

  if (timeTableAdded) {
    return (
      <View style={styles.container}>
        <TouchableHighlight
          style={styles.addNewButton}
          onPress={() => {
            refreshModal();
            setModalVisible(true);
          }}
        >
          <Text style={styles.addNewButtonText}>Add New Record</Text>
        </TouchableHighlight>
        <View style={styles.timeTable}>
          <TabView
            style={styles.timetableTab}
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: Dimensions.get("window").width }}
            swipeEnabled={false}
            renderTabBar={(props) => (
              <TabBar
                {...props}
                renderLabel={({ route, color }) => (
                  <Text
                    style={{
                      color: colors.primary,
                      fontSize: 13,
                      fontFamily: "LatoBold",
                    }}
                  >
                    {route.title}
                  </Text>
                )}
                indicatorStyle={styles.indicatorStyle}
                style={styles.tabBar}
              />
            )}
          />
        </View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.modal}>
            <View style={styles.modelBackground} />
            <View style={styles.modalView}>
              <View>
                <Text style={styles.formTitle}>
                  {isUpdate ? "Update " : "Add New "}Time Table Record
                </Text>
                <View style={styles.formFieldFull}>
                  <Text style={styles.label}>Day</Text>
                  <View style={styles.formPicker}>
                    <Picker
                      selectedValue={selectedDay}
                      onValueChange={(itemValue, itemIndex) =>
                        setSelectedDay(itemValue)
                      }
                    >
                      <Picker.Item label="Monday" value="MON" />
                      <Picker.Item label="Tuesday" value="TUE" />
                      <Picker.Item label="Wednesday" value="WED" />
                      <Picker.Item label="Thursday" value="THU" />
                      <Picker.Item label="Friday" value="FRI" />
                      <Picker.Item label="Saturday" value="SAT" />
                      <Picker.Item label="Sunday" value="SUN" />
                    </Picker>
                  </View>
                </View>

                <View style={styles.row}>
                  <View style={styles.formFieldHalf}>
                    <Text style={styles.label}>From</Text>
                    <TouchableWithoutFeedback onPress={showFromTimepicker}>
                      <View style={styles.formTimePicker}>
                        <Text style={styles.formTimePickerText}>
                          {fromTime.getHours() < 10 ? "0" : ""}
                          {fromTime.getHours()} :{" "}
                          {fromTime.getMinutes() < 10 ? "0" : ""}
                          {fromTime.getMinutes()}
                        </Text>
                        {fromShow && (
                          <DateTimePicker
                            testID="fromTimePicker"
                            value={fromTime}
                            mode={"time"}
                            is24Hour={true}
                            onChange={fromTimeOnChange}
                          />
                        )}
                      </View>
                    </TouchableWithoutFeedback>
                  </View>

                  <View style={styles.formFieldHalf}>
                    <Text style={styles.label}>To</Text>
                    <TouchableWithoutFeedback onPress={showToTimepicker}>
                      <View style={styles.formTimePicker}>
                        <Text style={styles.formTimePickerText}>
                          {toTime.getHours() < 10 ? "0" : ""}
                          {toTime.getHours()} :{" "}
                          {toTime.getMinutes() < 10 ? "0" : ""}
                          {toTime.getMinutes()}
                        </Text>
                        {toShow && (
                          <DateTimePicker
                            testID="toTimePicker"
                            value={toTime}
                            mode={"time"}
                            is24Hour={true}
                            onChange={toTimeOnChange}
                          />
                        )}
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                </View>

                <View style={styles.formFieldFull}>
                  <Text style={styles.label}>Task</Text>
                  <TextInput
                    style={styles.formInput}
                    placeholder={"Enter Task"}
                    autoCapitalize={"none"}
                    autoCorrect={false}
                    textContentType={"name"}
                    value={task}
                    onChangeText={(text) => setTask(text)}
                  ></TextInput>
                </View>
              </View>
              <View style={styles.modalButtonBar}>
                <TouchableHighlight
                  style={styles.modalCancelButton}
                  onPress={() => {
                    refreshModal();
                    setModalVisible(!modalVisible);
                  }}
                >
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </TouchableHighlight>

                <TouchableHighlight
                  style={styles.modalAddButton}
                  onPress={handleRecordSubmit}
                >
                  <Text style={styles.modalButtonText}>
                    {isUpdate ? "Update" : "Add"}
                  </Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.timeTableNotAddedDescription}>
          No time table is added currently
        </Text>
        <TouchableHighlight
          style={styles.addNewButton}
          onPress={() => console.log("Add New Timetable Button Pressed")}
        >
          <Text style={styles.addNewButtonText}>Add New Timetable</Text>
        </TouchableHighlight>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
  },
  addNewButton: {
    width: "50%",
    height: 40,
    margin: 30,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.addButtonColor,
  },
  addNewButtonText: {
    color: colors.white,
    fontSize: 14,
    fontFamily: "LatoBold",
  },
  timeTableNotAddedDescription: {
    fontFamily: "LatoLight",
    fontSize: 14,
    marginTop: 30,
  },
  timeTable: {
    width: "90%",
    height: "70%",
  },
  timetableTab: {
    width: "100%",
    height: "100%",
    backgroundColor: colors.white,
  },
  tabBar: {
    backgroundColor: colors.white,
    elevation: 0,
    shadowOffset: {
      width: 0,
      height: 0, // for iOS
    },
  },
  indicatorStyle: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderRadius: 200,
    padding: 1.5,
    height: "100%",
    borderColor: colors.primary,
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
    fontFamily: "LatoRegular",
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
  formTimePicker: {
    borderWidth: 1,
    borderColor: "#D8D8D8",
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  formTimePickerText: {
    fontSize: 16,
    color: colors.ash,
    fontFamily: "LatoRegular",
  },
  formTitle: {
    fontFamily: "LatoBold",
    fontSize: 16,
    width: "100%",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  label: {
    fontFamily: "LatoRegular",
    fontSize: 15,
    color: colors.black,
    marginBottom: 5,
  },
  row: {
    flexDirection: "row",
  },

  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalAddButton: {
    width: "30%",
    height: 40,
    margin: 30,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.addButtonColor,
  },
  modelBackground: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: colors.black,
    opacity: 0.6,
  },
  modalButtonBar: {
    flexDirection: "row",
  },
  modalButtonText: {
    color: colors.white,
    fontSize: 14,
    fontFamily: "LatoBold",
  },
  modalCancelButton: {
    width: "30%",
    height: 40,
    margin: 30,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.red,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default DailyTimetableComponent;
