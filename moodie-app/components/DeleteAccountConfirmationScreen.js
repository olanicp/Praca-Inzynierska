import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import GradientButton from "./GradientButton";
import { styles } from "./CredentialScreenStyles";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function DeleteAccountConfirmationScreen() {
  const handleDelete = async () => {
    try {
      const userData = await AsyncStorage.getItem("userData");
      const userID = JSON.parse(userData).userId;

      const response = await axios.post(
        "https://backend-qat1.onrender.com/delete-account",
        {
          userID,
        }
      );

      if (response.status === 200) {
        await AsyncStorage.removeItem("userData");
        navigation.navigate("Welcome");
      } else {
        console.log("error");
      }
    } catch (error) {
      console.error("Error deleting account", error);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={styles.backgroundGradient}
        style={styles.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <View style={styles.header}>
        <Text style={styles.title}>Are you sure?</Text>
        <Text style={styles.caption}>
          You are about to delete your account. This action is permanent.
        </Text>
      </View>

      <TouchableOpacity
        onPress={handleDelete}
        style={{
          borderColor: "#474146",
          borderRadius: 50,
          borderWidth: 1,
          margin: 15,
        }}
      >
        <GradientButton text="confirm"></GradientButton>
      </TouchableOpacity>
    </View>
  );
}
