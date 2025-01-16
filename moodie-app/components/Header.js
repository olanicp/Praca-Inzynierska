import React, { useEffect, useState } from "react";
import { styles } from "./MainAppStyles";
import { View, Text, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useNavigation } from "@react-navigation/native";

const getStreak = async () => {
  try {
    const userData = await AsyncStorage.getItem("userData");
    const streak = JSON.parse(userData).streak;
    if (streak) {
      return streak;
    }
    return null;
  } catch (error) {
    console.error("Error retrieving streak:", error);
    return null;
  }
};

export default function Header() {
  const [streak, setStreak] = useState(0);
  const navigation = useNavigation();

  const formatDate = (date) => {
    const userLocale = Intl.DateTimeFormat().resolvedOptions().locale;
    return new Intl.DateTimeFormat(userLocale, {
      weekday: "short",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  const currentDate = new Date();

  useEffect(() => {
    const fetchStreak = async () => {
      const streakData = await getStreak();
      setStreak(streakData);
    };

    fetchStreak();
  }, []);

  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.headerBubble}
        onPress={() => navigation.navigate("Profile")}
      >
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>E</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.dateAndStreak}>
        <View style={styles.headerBubble}>
          <Text style={styles.dateText}>{formatDate(currentDate)}</Text>
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
  );
}
