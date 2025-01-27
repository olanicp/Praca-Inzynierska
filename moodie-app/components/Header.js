import React, { useEffect, useState } from "react";
import { styles } from "./MainAppStyles";
import { View, Text, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useNavigation } from "@react-navigation/native";

export default function Header() {
  const [streak, setStreak] = useState(0);
  const [userName, setUsername] = useState("");
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

  const getStreak = async () => {
    try {
      const userData = await AsyncStorage.getItem("userData");
      if (userData) {
        const parsedData = JSON.parse(userData);
        return parsedData.streak ?? 0;
      }
      return 0;
    } catch (error) {
      console.error("Error retrieving streak:", error);
      return 0;
    }
  };

  const getUserName = async () => {
    try {
      const userData = await AsyncStorage.getItem("userData");
      if (userData) {
        const parsedData = JSON.parse(userData);
        return parsedData.name.slice(0, 1) ?? "";
      }
      return "";
    } catch (error) {
      console.error("Error retrieving username:", error);
      return "";
    }
  };

  const fetchAndSetStreak = async () => {
    const streakData = await getStreak();
    setStreak(streakData);
  };

  const fetchAndSetUserName = async () => {
    const username = await getUserName();
    setUsername(username);
  };

  useEffect(() => {
    fetchAndSetStreak();
    fetchAndSetUserName();

    const unsubscribe = navigation.addListener("focus", () => {
      fetchAndSetStreak();
      fetchAndSetUserName();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.headerBubble}
        onPress={() => navigation.navigate("Profile")}
      >
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{userName}</Text>
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
            {streak !== null ? streak : "Loading..."}{" "}
            {/* Wyświetlanie 'Loading...' podczas ładowania */}
          </Text>
        </View>
      </View>
    </View>
  );
}
