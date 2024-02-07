import React from "react";
import { SafeAreaView, Text, StyleSheet, Dimensions, View } from "react-native";
import { TabView, TabBar } from "react-native-tab-view";

import colors from "../config/colors";
import DailyTimetableComponent from "../components/DailyTimetableComponent";
import TaskSchedulingComponent from "../components/TaskSchedulingComponent";

const DailyTimetableRoute = () => <DailyTimetableComponent />;

const TaskSchedulingRoute = () => <TaskSchedulingComponent />;

function SchedulerScreen(props) {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Daily Timetable" },
    { key: "second", title: "Task Scheduling" },
  ]);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "first":
        return <DailyTimetableRoute />;
      case "second":
        return <TaskSchedulingRoute />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Scheduler</Text>
      <TabView
        style={styles.schedulerTab}
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
                  fontSize: 16,
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
  },

  indicatorStyle: {
    backgroundColor: colors.primary,
    padding: 1.5,
    marginBottom: -2,
  },
  pageTitle: {
    position: "absolute",
    color: colors.primary,
    fontFamily: "LatoBold",
    fontSize: 20,
    top: 50,
  },
  schedulerTab: {
    width: "100%",
    height: 400,
    top: 100,
    backgroundColor: colors.white,
  },
  tabBar: {
    backgroundColor: colors.white,
  },
});

export default SchedulerScreen;
