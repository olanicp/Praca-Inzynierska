import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import GradientButton from "./GradientButton";
import { styles } from "./CredentialScreenStyles";
import axios from "axios";

export default function ResetPasswordSuccessScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={styles.backgroundGradient}
        style={styles.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <View style={styles.header}>
        <Text style={styles.title}>Success!</Text>
        <Text style={styles.caption}>
          Your new password has been configured
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
        style={{
          borderColor: "#474146",
          borderRadius: 50,
          borderWidth: 1,
          margin: 15,
        }}
      >
        <GradientButton text="go to login"></GradientButton>
      </TouchableOpacity>
    </View>
  );
}
