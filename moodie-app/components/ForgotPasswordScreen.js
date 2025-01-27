import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import GradientButton from "./GradientButton";
import * as Linking from "expo-linking";
import { styles } from "./CredentialScreenStyles";
import axios from "axios";

export default function ForgotPasswordScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState({ value: "", error: "" });

  const onSubmitPressed = async (event) => {
    try {
      const response = await axios.post(
        "https://backend-qat1.onrender.com/reset-password",
        {
          email: email.value,
        }
      );

      if (response.status === 200) {
        alert("Dane przesłane");
        navigation.navigate("ConfirmationCode");
      } else {
        throw new Error("error has occurred");
      }
    } catch (error) {
      alert(error.response.data);
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
        <Text style={styles.title}>Forgot password</Text>
        <Text style={styles.caption}>Enter your email address below.</Text>
      </View>

      <View style={{ paddingVertical: 50 }}>
        <Text style={styles.inputBoxName}>Email</Text>
        <TextInput
          label="email"
          placeholder="email"
          value={email.value}
          style={styles.inputBox}
          onChangeText={(text) => setEmail({ value: text, error: "" })}
        />
      </View>

      <View style={{ paddingBottom: 75 }}>
        <TouchableOpacity
          onPress={onSubmitPressed}
          style={{
            borderColor: "#474146",
            borderRadius: 50,
            borderWidth: 1,
            margin: 15,
          }}
        >
          <GradientButton text="submit"></GradientButton>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.clickableText}>Or go back to login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
