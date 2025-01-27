import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import GradientButton from "./GradientButton";
import { styles } from "./CredentialScreenStyles";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ResetPasswordScreen() {
  const navigation = useNavigation();
  const [newEmail, setNewEmail] = useState({ value: "", error: "" });

  const onSubmitPressed = async (event) => {
    try {
      const userData = await AsyncStorage.getItem("userData");
      const accessToken = JSON.parse(userData).accessToken;
      const refreshToken = JSON.parse(userData).refreshToken;
      const response = await axios.post(
        "https://backend-qat1.onrender.com/update-email",
        { newEmail: newEmail.value, refreshToken: refreshToken },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.status === 200) {
        alert("Dane przesłane");
        navigation.goBack();
      } else {
        throw new Error("error has occurred");
      }
    } catch (error) {
      alert(error.response.data.error);
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
        <Text style={styles.title}>Change email</Text>
        <Text style={styles.caption}>Enter the new email below</Text>
      </View>

      <View style={{ paddingVertical: 50 }}>
        <Text style={styles.inputBoxName}>New email</Text>
        <TextInput
          label="new email"
          placeholder="new email"
          value={newEmail.value}
          style={styles.inputBox}
          onChangeText={(text) => setNewEmail({ value: text, error: "" })}
        />
      </View>

      <TouchableOpacity
        onPress={onSubmitPressed}
        style={{
          borderColor: "#474146",
          borderRadius: 50,
          borderWidth: 1,
          margin: 15,
        }}
      >
        <GradientButton text="save"></GradientButton>
      </TouchableOpacity>
    </View>
  );
}
