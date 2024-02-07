import React from "react";
import { Text, View, StyleSheet, TouchableHighlight } from "react-native";

import colors from "../config/colors";

function MoodPreferencesComponent({ mood }) {
  return (
    <View style={styles.moodComponent}>
      <Text style={styles.moodComponentTitle}>{mood} Mood</Text>

      <Text style={styles.moodComponentDescription}>
        Please upload resources that will help Mihasa when she is in {mood} mood
      </Text>

      <TouchableHighlight
        style={styles.uploadNewResourceButton}
        onPress={() => console.log("Upload New Resource Button Pressed")}
      >
        <Text style={styles.uploadNewResourceButtonText}>
          Upload New Resource
        </Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  moodComponent: {
    width: "100%",
    padding: 10,
  },
  moodComponentDescription: {
    width: "100%",
    textAlign: "center",
    fontFamily: "LatoLight",
  },
  moodComponentTitle: {
    width: "100%",
    textAlign: "center",
    fontSize: 20,
    fontFamily: "LatoBold",
    marginTop: 10,
    marginBottom: 10,
  },
  uploadNewResourceButton: {
    left: "25%",
    width: "50%",
    height: 30,
    marginTop: "5%",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.addButtonColor,
  },
  uploadNewResourceButtonText: {
    color: colors.white,
    fontSize: 14,
    fontFamily: "LatoBold",
  },
});

export default MoodPreferencesComponent;
