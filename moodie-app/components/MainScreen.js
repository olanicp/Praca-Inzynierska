import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { styles } from "./MainAppStyles";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import GradientButton from "./GradientButton";
import AsyncStorage from "@react-native-async-storage/async-storage";


const getStreak = async () => {
  try {
    const streak = await AsyncStorage.getItem('streak');
    if (streak) {
      console.log('streak', streak)
      return streak
    }
    return null;
  } catch (error) {
    console.error('Error retrieving streak:', error);
    return null;
  }
};

export default function MainScreen() {
  const [streak, setStreak] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
        const fetchStreak = async () => {
          const streakData = await getStreak();
          setStreak(streakData);
        };
      
        fetchStreak();
      }, []);
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
              {streak}
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
            onPress={() => navigation.navigate("EmotionIdentificationCarousel")}
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
