import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

//screens
import HomeScreen from "../screens/HomeScreen";
import EmotionTrackerScreen from "../screens/EmotionTrackerScreen";
import SchedulerScreen from "../screens/SchedulerScreen";
import SettingsScreen from "../screens/SettingsScreen";

import colors from "../config/colors";

//screen names
const homeName = "Home";
const emotionTrackerName = "Emotion Tracker";
const schedulerName = "Scheduler";
const settingsName = "Settings";

const Tab = createBottomTabNavigator();

function AppNavigator(props) {
  return (
    <Tab.Navigator
      initialRouteName={homeName}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.primary,
          height: 80,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;
          if (rn === homeName) {
            iconName = focused ? "home" : "home-outline";
          } else if (rn === emotionTrackerName) {
            iconName = focused ? "fitness" : "fitness-outline";
          } else if (rn === schedulerName) {
            iconName = focused ? "calendar" : "calendar-outline";
          } else if (rn === settingsName) {
            iconName = focused ? "settings" : "settings-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "#ACD9FF",
        tabBarLabelStyle: {
          paddingBottom: 25,
          fontSize: 12,
          fontFamily: "LatoBold",
        },
      })}
    >
      <Tab.Screen name={homeName} component={HomeScreen} />
      <Tab.Screen name={emotionTrackerName} component={EmotionTrackerScreen} />
      <Tab.Screen name={schedulerName} component={SchedulerScreen} />
      <Tab.Screen name={settingsName} component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default AppNavigator;
