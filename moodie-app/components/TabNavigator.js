import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { LinearGradient } from "expo-linear-gradient";
import MainScreen from "./MainScreen";
import CalendarScreen from "./CalendarScreen";
import StatisticsScreen from "./StatisticsScreen";
import ProfileScreen from "./ProfileScreen";

const Tab = createBottomTabNavigator();

const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <LinearGradient
      colors={["#A9C7EF", "#C6DCF9", "#F5ABD6"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.navbar}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const icons = {
          Main: "home",
          Calendar: "calendar",
          Statistics: "barschart",
          Profile: "user",
        };

        if (route.name === "Statistics") {
          return (
            <>
              <LinearGradient
                key={"AddEntry"}
                colors={["#A9C7EF", "#C6DCF9", "#F5ABD6"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.linearGradient}
                // onPress={() => navigation.navigate("Main")}
              >
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() =>
                    navigation.navigate("EmotionIdentificationCarousel")
                  }
                >
                  <AntDesign name="plus" size={42} color="#868185" />
                </TouchableOpacity>
              </LinearGradient>
              <TouchableOpacity
                key={route.key}
                onPress={() => navigation.navigate(route.name)}
                style={(styles.navItem, isFocused && styles.focusedNavItem)}
              >
                <AntDesign name={icons[route.name]} size={28} color="white" />
              </TouchableOpacity>
            </>
          );
        }

        return (
          <TouchableOpacity
            key={route.key}
            onPress={() => navigation.navigate(route.name)}
            style={(styles.navItem, isFocused && styles.focusedNavItem)}
          >
            <AntDesign name={icons[route.name]} size={28} color="white" />
          </TouchableOpacity>
        );
      })}
    </LinearGradient>
  );
};

export default function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Main"
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen name="Main" component={MainScreen} />
      <Tab.Screen name="Calendar" component={CalendarScreen} />
      <Tab.Screen name="Statistics" component={StatisticsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  navbar: {
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 65,
    borderRadius: 50,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    margin: 10,
  },
  navItem: {
    alignItems: "center",
  },
  focusedNavItem: {
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 2,
    borderBottomColor: "white",
  },
  addButton: {
    width: 75,
    height: 75,
    borderRadius: 50,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  linearGradient: {
    height: 80,
    width: 80,
    borderRadius: 50,
    marginBottom: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});
