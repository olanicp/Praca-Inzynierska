import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AntDesign from "@expo/vector-icons/AntDesign";
import { styles } from "./MainAppStyles";

export default function StreakScreen({ streak, loginDays }) {
  const days = ["M", "T", "W", "T", "F", "S", "S"];

  const getDaysInOrder = () => {
    const firstDayIndex = loginDays.length > 0 ? loginDays[0] : 0;
    const orderedDays = [];
    for (let i = 0; i < 7; i++) {
      orderedDays.push(days[(firstDayIndex + i) % 7]);
    }
    return orderedDays;
  };

  return (
    <View
      style={[
        styles.container,
        {
          alignItems: "center",
          justifyContent: "center",
        },
      ]}
    >
      <LinearGradient
        colors={["#e480bb", "#ffffff", "#e480bb"]}
        locations={[0, 0.5, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.background}
      />

      <Text style={styles.streakNumber}>{streak}</Text>
      <Text style={styles.streakText}>day streak!</Text>
      <Text style={styles.description}>Check in everyday to keep it going</Text>

      <View style={styles.daysContainer}>
        {getDaysInOrder().map((day, index) => (
          <View key={index} style={styles.dayWrapper}>
            <Text style={styles.dayText}>{day}</Text>
            <View
              style={[
                styles.circle,
                loginDays.includes((loginDays[0] + index) % 7)
                  ? styles.checkedCircle
                  : styles.uncheckedCircle,
              ]}
            >
              {loginDays.includes((loginDays[0] + index) % 7) && (
                <AntDesign name="check" size={24} color="#474146" />
              )}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
