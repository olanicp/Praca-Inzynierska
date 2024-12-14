import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';

export default function MainScreen() {
  const navigation = useNavigation();
  return (
  
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>E</Text>
        </View>
        <View style={styles.dateAndStreak}>
          <Text style={styles.dateText}>Sat, Dec 7</Text>
          <View style={styles.streak}>
            <Text style={styles.streakText}>🔥 6</Text>
          </View>
        </View>
      </View>
       <View style={styles.greeting}>
        <Text style={styles.greetingText}>Hi, Emma!</Text>
        <Text style={styles.questionText}>How are you feeling today?</Text>
        <TouchableOpacity 
        style={styles.actionButton}
        onPress={() => navigation.navigate('FrequencyScreen')}
        >
          <Text style={styles.actionButtonText}>➔</Text>
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

      <View style={styles.navbar}>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>🏠</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>📊</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>📅</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>👤</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "linear-gradient(180deg, #E9C0FF, #FFFFFF)", // Gradient background
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#EFEFEF",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#666",
  },
  dateAndStreak: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateText: {
    fontSize: 16,
    color: "#666",
    marginRight: 10,
  },
  streak: {
    backgroundColor: "#FFE0E0",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  streakText: {
    color: "#FF5733",
    fontWeight: "bold",
  },
  greeting: {
    alignItems: "center",
    marginBottom: 40,
  },
  greetingText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  questionText: {
    fontSize: 18,
    color: "#666",
    marginBottom: 20,
  },
  actionButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#FFD6FF",
    justifyContent: "center",
    alignItems: "center",
  },
  actionButtonText: {
    fontSize: 24,
    color: "#555",
  },
  inputSection: {
    marginBottom: 40,
  },
  inputLabel: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: "#333",
    backgroundColor: "#F9F9F9",
    textAlignVertical: "top",
    minHeight: 100,
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 60,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#DDD",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    alignItems: "center",
  },
  navIcon: {
    fontSize: 24,
    color: "#AAA",
  },
  addButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FFD6FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  addButtonText: {
    fontSize: 30,
    color: "#FFFFFF",
  },
});