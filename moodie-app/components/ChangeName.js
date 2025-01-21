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
  const [name, setName] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });

  const onSubmitPressed = async (event) => {
    try {
      const userData = await AsyncStorage.getItem("userData");
      const userID = JSON.parse(userData).userId;
      const response = await axios.post(
        "https://backend-qat1.onrender.com/change-name",
        {
          name: name.value,
          userId: userID,
        }
      );
      if (response.status === 200) {
        alert("Dane przesłane");
        navigation.goBack();
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
        <Text style={styles.title}>Change name</Text>
        <Text style={styles.caption}>
          Enter the new name you want to be displayed
        </Text>
      </View>

      <View style={{ paddingVertical: 50 }}>
        <Text style={styles.inputBoxName}>New name</Text>
        <TextInput
          label="name"
          placeholder="new name"
          value={name.value}
          style={styles.inputBox}
          onChangeText={(text) => setName({ value: text, error: "" })}
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
