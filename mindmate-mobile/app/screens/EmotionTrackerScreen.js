import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import { LineChart } from "react-native-chart-kit";

import colors from "../config/colors";

function EmotionTrackerScreen(props) {
  const [firstButtonClicked, setFirstButtonClicked] = useState(true);
  const [secondButtonClicked, setSecondButtonClicked] = useState(false);
  const [thirdButtonClicked, setThirdButtonClicked] = useState(false);

  let mood = "Happy";
  let image = require("../assets/emotions/happy.png");
  if (mood === "Angry") {
    image = require("../assets/emotions/angry.png");
  } else if (mood === "Disgust") {
    image = require("../assets/emotions/disgust.png");
  } else if (mood === "Fear") {
    image = require("../assets/emotions/fear.png");
  } else if (mood === "Happy") {
    image = require("../assets/emotions/happy.png");
  } else if (mood === "Neutral") {
    image = require("../assets/emotions/neutral.png");
  } else if (mood === "Sad") {
    image = require("../assets/emotions/sad.png");
  } else if (mood === "Suprised") {
    image = require("../assets/emotions/suprised.png");
  }

  const [linedata, setLineData] = useState({
    labels: [],
    datasets: [
      {
        data: [1, 2, 3, 4, 5, 6, 6, 6, 6, 5, 4, 3, 2, 1],
        strokeWidth: 2,
      },
    ],
  });

  const handleFirstButtonClick = () => {
    console.log("Day Button Pressed");
    setFirstButtonClicked(true);
    setSecondButtonClicked(false);
    setThirdButtonClicked(false);
    setLineData({
      labels: [],
      datasets: [
        {
          data: [1, 2, 3, 4, 5, 6, 6, 6, 6, 5, 4, 3, 2, 1],
          strokeWidth: 2,
        },
      ],
    });
  };
  const handleSecondButtonClick = () => {
    console.log("3 Days Button Pressed");
    setFirstButtonClicked(false);
    setSecondButtonClicked(true);
    setThirdButtonClicked(false);
    setLineData({
      labels: [],
      datasets: [
        {
          data: [
            1, 2, 3, 4, 5, 6, 6, 6, 6, 5, 4, 3, 2, 1, 1, 2, 3, 4, 5, 6, 6, 6, 6,
            5, 4, 3, 2, 1,
          ],
          strokeWidth: 2,
        },
      ],
    });
  };
  const handleThirdButtonClick = () => {
    console.log("Week Button Pressed");
    setFirstButtonClicked(false);
    setSecondButtonClicked(false);
    setThirdButtonClicked(true);
    setLineData({
      labels: [],
      datasets: [
        {
          data: [
            1, 2, 3, 4, 5, 6, 6, 6, 6, 7, 5, 4, 3, 2, 1, 1, 2, 3, 4, 5, 6, 6, 6,
            6, 5, 4, 3, 2, 1, 1, 2, 3, 4, 5, 6, 6, 6, 6, 5, 4, 3, 2, 1,
          ],
          strokeWidth: 2, // optional
        },
      ],
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.emotionsContainer}>
        <Image source={image} style={styles.emotionImage} />
        <Text style={styles.emotionText}>Mihasa is Now in a {mood} Mood</Text>
        <TouchableOpacity
          style={styles.emotionRespondButton}
          onPress={() => console.log("Respond Button Pressed")}
        >
          <Text style={styles.emotionRespondButtonText}>Respond to Her</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.graphContainer}>
          <Text style={styles.graphTitle}>
            Her Past Emotion Changing Pattern
          </Text>
          <View style={styles.graphButtonBar}>
            <TouchableOpacity
              style={
                firstButtonClicked
                  ? [styles.graphButton, styles.graphButtonClicked]
                  : [styles.graphButton]
              }
              onPress={handleFirstButtonClick}
            >
              <Text
                style={
                  firstButtonClicked
                    ? [styles.graphButtonText, styles.graphButtonTextClicked]
                    : [styles.graphButtonText]
                }
              >
                Day
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                secondButtonClicked
                  ? [styles.graphButton, styles.graphButtonClicked]
                  : [styles.graphButton]
              }
              onPress={handleSecondButtonClick}
            >
              <Text
                style={
                  secondButtonClicked
                    ? [styles.graphButtonText, styles.graphButtonTextClicked]
                    : [styles.graphButtonText]
                }
              >
                3 Days
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                thirdButtonClicked
                  ? [styles.graphButton, styles.graphButtonClicked]
                  : [styles.graphButton]
              }
              onPress={handleThirdButtonClick}
            >
              <Text
                style={
                  thirdButtonClicked
                    ? [styles.graphButtonText, styles.graphButtonTextClicked]
                    : [styles.graphButtonText]
                }
              >
                Week
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.graphMoreButton}
              onPress={() => console.log("Check History Pressed")}
            >
              <Text style={styles.graphMoreButtonText}>Check More History</Text>
            </TouchableOpacity>
          </View>
          <LineChart
            data={linedata}
            width={Dimensions.get("window").width - 20}
            height={250}
            yAxisLabel={""}
            withHorizontalLines={false}
            withVerticalLines={false}
            fromZero={true}
            chartConfig={{
              backgroundColor: "#ffffff",
              backgroundGradientFrom: "black",
              backgroundGradientTo: colors.primary,
              decimalPlaces: 1, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "2",
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>
      </ScrollView>
      <Text style={styles.pageTitle}>Emotion Tracker</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
  },
  emotionsContainer: {
    backgroundColor: colors.primary,
    width: "100%",
    height: "50%",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    alignItems: "center",
  },
  emotionImage: {
    position: "relative",
    width: 200,
    height: 200,
    top: "20%",
  },
  emotionRespondButton: {
    position: "relative",
    width: "50%",
    height: "10%",
    top: "20%",
    marginBottom: "5%",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
  },
  emotionRespondButtonText: {
    color: colors.primary,
    fontSize: 18,
    fontFamily: "LatoRegular",
  },
  emotionText: {
    position: "relative",
    top: "16%",
    margin: 5,
    fontFamily: "LatoRegular",
    fontSize: 16,

    color: colors.white,
  },
  graphButton: {
    width: "20%",
    margin: "1%",
    borderColor: colors.primary,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    borderRadius: 20,
  },
  graphButtonClicked: {
    backgroundColor: colors.primary,
  },
  graphButtonBar: {
    width: "100%",
    flexDirection: "row",
  },
  graphButtonText: {
    fontFamily: "LatoBold",
    fontSize: 15,
    textAlign: "center",
  },
  graphButtonTextClicked: {
    color: colors.white,
  },
  graphContainer: {
    width: Dimensions.get("window").width,
    padding: 10,
    alignItems: "center",
  },
  graphMoreButton: {
    width: "32%",
    margin: "1%",
    backgroundColor: colors.black,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    borderRadius: 20,
  },
  graphMoreButtonText: {
    fontFamily: "LatoBold",
    fontSize: 14,
    textAlign: "center",
    color: colors.white,
  },
  graphTitle: {
    fontFamily: "LatoBold",
    fontSize: 20,
    color: colors.primary,
    margin: 20,
  },

  pageTitle: {
    position: "absolute",
    color: colors.white,
    fontFamily: "LatoBold",
    fontSize: 20,
    top: 50,
  },
});

export default EmotionTrackerScreen;
