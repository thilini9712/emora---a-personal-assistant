import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Alert,
} from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import { Dimensions } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import colors from "../config/colors";
import {
  deleteTimetableRecord,
  getTimetableRecordForDay,
} from "../repository/TimetableRepository";
import { useFocusEffect } from "@react-navigation/native";
function TimeTableDayViewComponent({
  day,
  setModalVisible,
  setSelectedDay,
  setFromTime,
  setToTime,
  setTask,
  setIsUpdate,
  setId,
}) {
  const [tasks, setTasks] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;
      getTasks();
      console.log("Get Tasks");
      return () => {
        isActive = false;
      };
    }, [day])
  );

  const getTasks = () => {
    getTimetableRecordForDay(day, 1)
      .then((res) => {
        setTasks(res.data.body);
      })
      .catch((err) => console.log(err));
  };
  // useEffect(() => {
  //   setTasks([
  //     {
  //       id: 1,
  //       from: "08:00 AM",
  //       to: "10:00 AM",
  //       task: "Reading Books",
  //     },
  //     {
  //       id: 2,
  //       from: "08:00 AM",
  //       to: "10:00 AM",
  //       task: "Reading Books",
  //     },
  //     {
  //       id: 3,
  //       from: "08:00 AM",
  //       to: "10:00 AM",
  //       task: "Reading Books",
  //     },
  //     {
  //       id: 4,
  //       from: "08:00 AM",
  //       to: "10:00 AM",
  //       task: "Reading Books",
  //     },
  //     {
  //       id: 5,
  //       from: "08:00 AM",
  //       to: "10:00 AM",
  //       task: "Reading Books",
  //     },
  //   ]);
  // }, []);

  const getGMTTime = (timeString) => {
    const [time, ampm] = timeString.split(" ");
    const [hourString, minuteString] = time.split(":");
    const hour = parseInt(hourString, 10);
    const minute = parseInt(minuteString, 10);
    const gmtTime = new Date();
    gmtTime.setHours(ampm === "PM" ? hour + 12 : hour, minute, 0, 0);
    return gmtTime;
  };

  const editRecord = (id, day, fromTime, toTime, task) => {
    setModalVisible(true);
    setSelectedDay(day);
    setFromTime(getGMTTime(fromTime));
    setToTime(getGMTTime(toTime));
    setTask(task);
    setIsUpdate(true);
    setId(id);
  };

  const sendRequest = async (id) => {
    deleteTimetableRecord(id)
      .then((res) => {
        if (res.status === 200) {
          if (res.data.success) {
            // dispatcher(updateParent(parentDetails));
            Alert.alert("Success", res.data.message, [
              {
                text: "Ok",
                onPress: () => {
                  getTasks();
                  console.log("Record Deleted");
                },
                style: "default",
              },
            ]);
          } else {
            Alert.alert("Error", res.data.message, [
              {
                text: "Ok",
                onPress: () => {
                  console.log("Record Delete Failed");
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
                console.log("Record Delete Failed");
              },
              style: "cancel",
            },
          ]);
        }
      })
      .catch((err) => console.log(err));
  };

  const deleteRecord = async (id) => {
    Alert.alert(
      "Are You Sure?",
      "Do you want to delete the time table record?",
      [
        {
          text: "Yes",
          onPress: () => sendRequest(id),
          style: "cancel",
        },
        {
          text: "No",
          onPress: () => console.log("Don't want to delete"),
          style: "cancel",
        },
      ]
    );
  };
  return (
    <SwipeListView
      data={tasks}
      renderItem={(data, rowMap) => (
        <View style={styles.container}>
          <View style={styles.time}>
            <Text style={styles.timeText}>{data.item.fromTime}</Text>
            <Text style={styles.timeText}>to</Text>
            <Text style={styles.timeText}>{data.item.toTime}</Text>
          </View>
          <View style={styles.task}>
            <Text style={styles.taskText}>{data.item.task}</Text>
          </View>
        </View>
      )}
      renderHiddenItem={(data, rowMap) => (
        <View style={styles.rowBack}>
          <TouchableHighlight
            onPress={() =>
              editRecord(
                data.item.id,
                data.item.day,
                data.item.fromTime,
                data.item.toTime,
                data.item.task
              )
            }
            style={[styles.backRightButton, styles.backRightButtonLeft]}
          >
            <Ionicons name="create-outline" size={20} color="white" />
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => deleteRecord(data.item.id)}
            style={[styles.backRightButton, styles.backRightButtonRight]}
          >
            <Ionicons name="trash-outline" size={20} color="white" />
          </TouchableHighlight>
        </View>
      )}
      leftOpenValue={0}
      rightOpenValue={-145}
      disableRightSwipe
    />
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width - 40,
    flexDirection: "row",
    marginTop: 10,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 6,
    backgroundColor: colors.white,
  },
  time: {
    width: "29%",
    backgroundColor: colors.primary,
    alignItems: "center",
    padding: 10,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 5,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 5,
  },
  task: {
    width: "70%",
    justifyContent: "center",
  },
  timeText: {
    fontFamily: "LatoBold",
    fontSize: 15,
    color: colors.white,
  },
  taskText: {
    fontFamily: "LatoBold",
    fontSize: 15,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 0,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 0,
    textAlignVertical: "center",
    padding: 5,
  },
  buttonBar: {
    width: "100%",
    height: "50%",
    flexDirection: "row",
  },
  space: {
    width: "45%",
  },
  editButton: {
    width: "25%",
    height: "80%",
    backgroundColor: colors.yellow,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    margin: 3,
  },
  editButtonText: {
    fontFamily: "LatoBold",
    fontSize: 13,
  },
  deleteButton: {
    width: "25%",
    height: "80%",
    backgroundColor: colors.red,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    margin: 3,
  },
  deleteButtonText: {
    fontFamily: "LatoBold",
    fontSize: 13,
    color: colors.white,
  },
  rowBack: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 15,
    marginTop: 10,
    marginBottom: 0,
    borderRadius: 5,
  },
  backRightButton: {
    alignItems: "flex-end",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 75,
    alignItems: "center",
  },
  backRightButtonText: {
    fontFamily: "LatoBold",
    color: colors.white,
  },
  backRightButtonLeft: {
    backgroundColor: colors.blue,
    right: 115,
  },
  backRightButtonRight: {
    backgroundColor: colors.red,
    right: 40,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
});

export default TimeTableDayViewComponent;
