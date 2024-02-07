import React, { useEffect, useState } from "react";
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Modal,
  TextInput,
  ScrollView,
} from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import DateTimePicker from "@react-native-community/datetimepicker";
import Ionicons from "react-native-vector-icons/Ionicons";

import colors from "../config/colors";

function TaskSchedulingComponent(props) {
  //on screen loading
  useEffect(() => {
    const currentDate = new Date();
    const month =
      currentDate.getMonth() < 10
        ? "0" + (currentDate.getMonth() + 1)
        : currentDate.getMonth() + 1;
    const day =
      currentDate.getDate() < 10
        ? "0" + currentDate.getDate()
        : currentDate.getDate();
    setSelectedDate(currentDate.getFullYear() + "-" + month + "-" + day);
    const selectedDates = { ...datesWithEvents };
    selectedDates[selectedDate] = {
      selected: true,
      selectedColor: colors.primary,
    };
    setMarkedDates(selectedDates);
  }, []);

  //values for the calendar
  const [selectedDate, setSelectedDate] = useState("");
  const [markedDates, setMarkedDates] = useState();
  const [datesWithEvents, setDatesWithEvents] = useState({
    "2023-07-01": {
      selected: true,
      selectedColor: colors.yellow,
      events: [
        {
          id: 1,
          name: "Dancing Concert",
          from: 1689438446875,
          to: 1689438446875,
          remindTime: 1689438446875,
        },
        {
          id: 2,
          name: "Special Dinner",
          from: 1689438446875,
          to: 1689438446875,
          remindTime: 1689438446875,
        },
      ],
    },
    "2023-07-03": {
      selected: true,
      selectedColor: colors.yellow,
      events: [
        {
          id: 1,
          name: "Road Trip",
          from: 1689438446875,
          to: 1689438446875,
          remindTime: 1689438446875,
        },
      ],
    },
  });

  //values for agenda
  const [eventsAvailable, setEventsAvailable] = useState(false);
  const [events, setEvents] = useState();

  //values for popup modal
  const [modalVisible, setModalVisible] = useState(false);
  const [fromTime, setFromTime] = useState(new Date(1689438446875));
  const [toTime, setToTime] = useState(new Date());
  const [reminderTime, setReminderTime] = useState(new Date());
  const [fromShow, setFromShow] = useState(false);
  const [toShow, setToShow] = useState(false);
  const [reminderTimeShow, setReminderTimeShow] = useState(false);
  const [note, setNote] = useState("");

  const [updateEventStatus, setUpdateEventStatus] = useState(false);

  //calendr functions
  const handleDayPress = (day) => {
    console.log(day);
    console.log(new Date().valueOf());
    setSelectedDate(day.dateString);

    const selectedDates = { ...datesWithEvents };
    selectedDates[day.dateString] = {
      selected: true,
      selectedColor: colors.primary,
    };
    setMarkedDates(selectedDates);

    const dayDetails = markedDates[day.dateString];
    if (dayDetails != undefined) {
      if (dayDetails.events != undefined) {
        setEvents(dayDetails.events);
        setEventsAvailable(true);
      } else {
        setEventsAvailable(false);
      }
    } else {
      setEventsAvailable(false);
    }
  };

  //popup functions
  const popUpAddForm = () => {
    setModalVisible(true);
  };
  const popUpEditForm = (note, from, to, reminder) => {
    setUpdateEventStatus(true);
    setModalVisible(true);
    setNote(note);
    setFromTime(new Date(from));
    setToTime(new Date(to));
    setReminderTime(new Date(reminder));
  };
  const closePopUp = () => {
    setUpdateEventStatus(false);
    setModalVisible(!modalVisible);
    setNote("");
    setFromTime(new Date());
    setToTime(new Date());
    setReminderTime(new Date());
  };

  //popup time picker functions
  const fromTimeOnChange = (event, selected) => {
    const current = selected;
    setFromShow(false);
    setFromTime(current);
  };
  const toTimeOnChange = (event, selected) => {
    const current = selected;
    setToShow(false);
    setToTime(current);
  };
  const reminderTimeOnChange = (event, selected) => {
    const current = selected;
    setReminderTimeShow(false);
    setReminderTime(current);
  };
  const showFromTimepicker = () => {
    setFromShow(true);
  };
  const showToTimepicker = () => {
    setToShow(true);
  };
  const showReminderTimepicker = () => {
    setReminderTimeShow(true);
  };

  //popup on change functions
  const handleNoteChange = (text) => {
    setNote(text);
    console.log(note);
  };

  //custom functions
  function getTimeString(s) {
    const time = new Date(s);
    return time.toLocaleTimeString();
    // return (
    //   (time.getHours() < 10 ? "0" : time.getHours()) +
    //   ":" +
    //   (time.getMinutes() < 10 ? "0" : time.getMinutes())
    // );
  }

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Calendar
          theme={{
            indicatorColor: colors.primary,
            arrowColor: colors.primary,
            disabledArrowColor: colors.ash,
            textDayFontFamily: "LatoRegular",
            textMonthFontFamily: "LatoBold",
            textDayHeaderFontFamily: "LatoBold",
          }}
          style={styles.calendar}
          onDayPress={(day) => handleDayPress(day)}
          markedDates={markedDates}
          enableSwipeMonths={true}
        />

        <View style={styles.agendaContainer}>
          {eventsAvailable && (
            <View style={styles.agendaActiveContainer}>
              {events.map((e) => (
                <TouchableOpacity
                  key={e.id}
                  onPress={() =>
                    popUpEditForm(e.name, e.from, e.to, e.remindTime)
                  }
                >
                  <View style={styles.agendaItem}>
                    <Text style={styles.agendaItemName}>{e.name}</Text>
                    <Text style={styles.agendaItemTime}>
                      From {getTimeString(e.from)} to {getTimeString(e.to)}
                    </Text>
                    <Text style={styles.agendaItemRemindTime}>
                      Remind at {getTimeString(e.remindTime)}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
          {!eventsAvailable && (
            <View style={[styles.agendaItem, styles.agendaInactiveItem]}>
              <Text style={styles.agendaInactiveItemText}>No Events</Text>
            </View>
          )}
          <TouchableOpacity onPress={popUpAddForm}>
            <Ionicons name="add-circle" size={40} color={colors.primary} />
          </TouchableOpacity>
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
                  {updateEventStatus ? "" : "Add New"} Reminder
                </Text>

                <View style={styles.formFieldFull}>
                  <Text style={styles.label}>Date</Text>
                  <View style={styles.formInput}>
                    <Text>{selectedDate}</Text>
                  </View>
                </View>

                <View style={styles.formFieldFull}>
                  <Text style={styles.label}>Note</Text>
                  <TextInput
                    style={styles.formInput}
                    placeholder={"Enter Event Note"}
                    autoCapitalize={"none"}
                    autoCorrect={false}
                    textContentType={"name"}
                    value={note}
                    onChangeText={(text) => handleNoteChange(text)}
                  ></TextInput>
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
                  <Text style={styles.label}>Remind Earlier At</Text>
                  <TouchableWithoutFeedback onPress={showReminderTimepicker}>
                    <View style={styles.formTimePicker}>
                      <Text style={styles.formTimePickerText}>
                        {reminderTime.getHours() < 10 ? "0" : ""}
                        {reminderTime.getHours()} :{" "}
                        {reminderTime.getMinutes() < 10 ? "0" : ""}
                        {reminderTime.getMinutes()}
                      </Text>
                      {reminderTimeShow && (
                        <DateTimePicker
                          testID="reminderTimePicker"
                          value={reminderTime}
                          mode={"time"}
                          is24Hour={true}
                          onChange={reminderTimeOnChange}
                        />
                      )}
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </View>
              <View style={styles.modalButtonBar}>
                <TouchableHighlight
                  style={styles.modalAddButton}
                  onPress={() => console.log("Add Button Pressed")}
                >
                  <Text style={styles.modalButtonText}>Add</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  style={styles.modalCancelButton}
                  onPress={closePopUp}
                >
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  agendaActiveContainer: {
    width: "100%",
  },
  agendaContainer: {
    marginTop: 20,
    width: Dimensions.get("window").width - 70,
    alignItems: "center",
  },
  agendaInactiveItem: {
    justifyContent: "center",
    padding: 10,
  },
  agendaInactiveItemText: {
    fontSize: 15,
    fontFamily: "LatoBold",
  },
  agendaItem: {
    width: "100%",
    borderWidth: 1,
    borderColor: colors.black,
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 5,
    padding: 5,
  },
  agendaItemName: {
    fontSize: 16,
    fontFamily: "LatoBold",
  },
  agendaItemRemindTime: {
    fontFamily: "LatoLight",
    marginTop: 5,
    fontSize: 14,
  },
  agendaItemTime: {
    fontFamily: "LatoRegular",
    marginTop: 5,
    fontSize: 14,
  },
  calendar: {
    marginTop: 20,
    width: Dimensions.get("window").width - 40,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
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
  row: {
    flexDirection: "row",
  },
  scrollView: {
    marginBottom: 100,
  },
});

export default TaskSchedulingComponent;
