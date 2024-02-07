import React, { useEffect } from "react";
import { SafeAreaView, Text, StyleSheet, Dimensions } from "react-native";
import { TabView, TabBar } from "react-native-tab-view";

import colors from "../config/colors";
import ChangePasswordComponent from "../components/ChangePasswordComponent";
import UserProfileComponent from "../components/UserProfileComponent";
import ChildProfileComponent from "../components/ChildProfileComponent";
import { getParentDetails } from "../repository/ParentRepository";
import { useDispatch, useSelector } from "react-redux";
import { addParent } from "../store/slices/parentSlice";
import { getChildDetails } from "../repository/ChildRepository";
import { addChild } from "../store/slices/childSlice";

const ChildProfileRoute = () => <ChildProfileComponent />;

const UserProfileRoute = () => <UserProfileComponent />;
const ChangePasswordRoute = () => <ChangePasswordComponent />;

function SettingsScreen(props) {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Child Profile" },
    { key: "second", title: "My Profile" },
    { key: "third", title: "Change Password" },
  ]);

  const dispatcher = useDispatch();

  useEffect(() => {
    getParentDetails(1)
      .then((res) => {
        dispatcher(addParent({ ...res.data.body }));
      })
      .catch((err) => console.log(err));

    getChildDetails(1)
      .then((res) => {
        dispatcher(addChild({ ...res.data.body }));
      })
      .catch((err) => console.log(err));
  }, []);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "first":
        return <ChildProfileRoute />;
      case "second":
        return <UserProfileRoute />;
      case "third":
        return <ChangePasswordRoute />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.pageTitle}>Settings</Text>
      <TabView
        style={styles.settingsTab}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get("window").width }}
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
    </SafeAreaView>
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
  settingsTab: {
    width: "100%",
    height: 400,
    top: 100,
    backgroundColor: colors.white,
  },
  tabBar: {
    backgroundColor: colors.white,
  },
});

export default SettingsScreen;
