import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { styles } from "./MainAppStyles";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import GradientButton from "./GradientButton";
import Header from "./Header";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function MainScreen() {
  const [name, setName] = useState("");
  const [entry, setEntry] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchEntry = async () => {
      try {
        const userData = await AsyncStorage.getItem("userData");
        const userID = JSON.parse(userData).userId;
        const response = await axios.get(
          "https://backend-qat1.onrender.com/journal-entry",
          {
            params: { userID },
          }
        );
        if (response.status === 200) {
          setEntry(response.data.entry);
        }
      } catch (error) {
        console.error("Error while fetching entry", error);
        alert(error.response.data.error);
      }
    };

    const fetchName = async () => {
      try {
        const userData = await AsyncStorage.getItem("userData");
        const name = JSON.parse(userData).name;
        setName(name);
      } catch (error) {
        console.error("Błąd pobierania imienia:", error);
      }
    };

    fetchName();
    fetchEntry();
  }, []);

  const handleUpdateEntry = (newEntry) => {
    setEntry(newEntry);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#F5ABD6", "#C4C1F2", "white"]}
        locations={[0, 0.22, 1]}
        style={styles.background}
      />
      <Header />
      <ScrollView style={styles.body}>
        {/* {userEmotions ? (
          <View style={[styles.bodyBubble, { height: 300 }]}>
            <Text style={styles.greetingText}>Today you are feeling</Text>
            <Text style={styles.questionText}>{userEmotions}</Text>
          </View>
        ) : ( */}
        <View style={[styles.bodyBubble, { height: 300 }]}>
          <Text style={styles.greetingText}>Hi, {name}!</Text>
          <Text style={styles.questionText}>
            How are you feeling right now?
          </Text>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate("EmotionIdentificationCarousel")}
          >
            <GradientButton
              text={"Let's find out together! →"}
            ></GradientButton>
          </TouchableOpacity>
        </View>
        {/* )} */}
        {entry ? (
          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Today's journal entry:</Text>

            <TouchableOpacity
              style={styles.textInput}
              onPress={() =>
                navigation.navigate("JournalScreen", {
                  entry: entry,
                  onSave: handleUpdateEntry,
                })
              }
            >
              <Text style={styles.inputLabel}>{entry}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Today's journal entry:</Text>
            <TouchableOpacity
              style={styles.textInput}
              onPress={() =>
                navigation.navigate("JournalScreen", {
                  entry: null,
                  onSave: handleUpdateEntry,
                })
              }
            >
              <Text style={styles.inputLabel}>
                Click here to write down your thoughts...
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
