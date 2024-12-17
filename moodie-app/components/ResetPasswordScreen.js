import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import GradientButton from "./GradientButton";
import { styles } from "./CredentialScreenStyles";
import axios from "axios";

export default function ResetPasswordScreen() {
  const navigation = useNavigation();
  const [password, setPassword] = useState({ value: "", error: "" });
  const [confirmPassword, setConfirmPassword] = useState({
    value: "",
    error: "",
  });

  const onSubmitPressed = async (event) => {
    try {
      const response = await axios.post(
        "http://192.168.43.115:5000/reset-password",
        {
          password: password.value,
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
        colors={["#C1EBF2", "white", "#FF8FD2"]}
        style={styles.background}
      />

      <View style={styles.header}>
        <Text style={styles.title}>Reset password</Text>
        <Text style={styles.caption}>Set your new password below.</Text>
      </View>

      <View style={{ paddingVertical: 50 }}>
        <Text style={styles.inputBoxName}>New password</Text>
        <TextInput
          label="password"
          placeholder="new password"
          value={password.value}
          style={styles.inputBox}
          onChangeText={(text) => setPassword({ value: text, error: "" })}
          secureTextEntry
        />

        <Text style={styles.inputBoxName}>Confirm password</Text>
        <TextInput
          label="confirmPassword"
          placeholder="confirm password"
          value={confirmPassword.value}
          style={styles.inputBox}
          onChangeText={(text) =>
            setConfirmPassword({ value: text, error: "" })
          }
          secureTextEntry
        />
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate("ResetPasswordSuccess")}
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
