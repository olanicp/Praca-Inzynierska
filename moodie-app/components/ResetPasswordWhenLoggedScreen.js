import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import GradientButton from "./GradientButton";
import { styles } from "./CredentialScreenStyles";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ResetPasswordWhenLoggedScreen = () => {
  const navigation = useNavigation();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    if (!password) {
      alert("Password cannot be empty.");
      return;
    }

    try {
      const userData = await AsyncStorage.getItem("userData");
      const accessToken = JSON.parse(userData).accessToken;
      const refreshToken = JSON.parse(userData).refreshToken;
      const response = await axios.post(
        "https://backend-qat1.onrender.com/user/reset-password",
        { newPassword: password, refreshToken: refreshToken },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Password has been reset successfully.");
        navigation.goBack();
      } else {
        alert(response.data.error);
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.error);
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
        <Text style={styles.title}>Reset password</Text>
        <Text style={styles.caption}>Set your new password below.</Text>
      </View>

      <View style={{ paddingVertical: 50 }}>
        <Text style={styles.inputBoxName}>New password</Text>
        <TextInput
          placeholder="new password"
          value={password}
          style={styles.inputBox}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />

        <Text style={styles.inputBoxName}>Confirm password</Text>
        <TextInput
          placeholder="confirm password"
          value={confirmPassword}
          style={styles.inputBox}
          onChangeText={(text) => setConfirmPassword(text)}
          secureTextEntry
        />
      </View>

      <TouchableOpacity
        onPress={handleSubmit}
        style={{
          borderColor: "#474146",
          borderRadius: 50,
          borderWidth: 1,
          margin: 15,
        }}
      >
        <GradientButton text="Save" />
      </TouchableOpacity>
    </View>
  );
};

export default ResetPasswordWhenLoggedScreen;
