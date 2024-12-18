import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import GradientButton from "./GradientButton";

export default function MainScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#F5ABD6", "#C4C1F2", "white"]}
        locations={[0, 0.22, 1]}
        style={styles.background}
      />
      <View style={styles.header}>
        <View style={styles.headerBubble}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>E</Text>
          </View>
        </View>
        <View style={styles.dateAndStreak}>
          <View style={styles.headerBubble}>
            <Text style={styles.dateText}>Sat, Dec 7</Text>
          </View>
          <View style={styles.headerBubble}>
            <FontAwesome6
              name="fire-flame-curved"
              size={24}
              color="#474146"
              style={{ paddingHorizontal: 5 }}
            />
            <Text
              style={{
                fontFamily: "Quicksand-Regular",
                fontSize: 16,
                color: "#474146",
                paddingHorizontal: 5,
              }}
            >
              6
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.body}>
        <View style={styles.bodyBubble}>
          <Text style={styles.greetingText}>Hi, Emma!</Text>
          <Text style={styles.questionText}>How are you feeling today?</Text>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate("FrequencyScreen")}
          >
            <GradientButton
              text={"Let's find out together! →"}
            ></GradientButton>
          </TouchableOpacity>
        </View>

        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Something on your mind?</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Write your thoughts here..."
            placeholderTextColor="#A0A0A0"
            multiline
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "900",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 50,
    backgroundColor: "#FFF6FB",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontFamily: "Quicksand-Regular",
    fontSize: 16,
    color: "#474146",
  },
  dateAndStreak: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  dateText: {
    fontSize: 16,
    color: "#474146",
    marginHorizontal: 5,
  },
  headerBubble: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#FFF6FB",
    opacity: 0.75,
    borderRadius: 50,
    padding: 10,
    marginHorizontal: 5,
  },
  body: {
    justifyContent: "space-between",
    flex: 1,
    marginBottom: 100,
  },
  bodyBubble: {
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#FFF6FB",
    opacity: 0.75,
    borderRadius: 33,
    paddingHorizontal: 15,
    paddingVertical: 30,
    marginVertical: 5,
  },
  greetingText: {
    fontFamily: "Quicksand-Regular",
    fontSize: 24,
    color: "black",
  },
  questionText: {
    fontFamily: "PlayfairDisplay-Regular",
    fontSize: 32,
    color: "black",
    letterSpacing: -1,
    textAlign: "center",
    marginBottom: 20,
  },
  actionButton: {
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  actionButtonText: {
    fontSize: 18,
    color: "#4474146",
  },
  inputSection: {
    marginTop: 20,
  },
  inputLabel: {
    fontFamily: "Quicksand-Regular",
    fontSize: 18,
    color: "#666",
    marginBottom: 10,
  },
  textInput: {
    fontFamily: "Quicksand-Regular",
    borderWidth: 1,
    borderColor: "#474146",
    borderRadius: 33,
    padding: 20,
    fontSize: 16,
    opacity: 0.75,
    color: "#474146",
    backgroundColor: "#F6FFFE",
    textAlignVertical: "top",
    minHeight: 150,
  },
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
  navIcon: {
    fontSize: 24,
    color: "#AAA",
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
  addButtonText: {
    fontSize: 30,
    color: "#474146",
  },
});
