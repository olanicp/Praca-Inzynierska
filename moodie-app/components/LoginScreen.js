import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import GradientButton from "./GradientButton";
import { styles } from "./CredentialScreenStyles";
import axios from "axios";

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });

  const onLoginPressed = async (event) => {
    try {
      const response = await axios.post("http://192.168.0.157:5000/login", { //for testing purposes change to the local ip address of the emulator
        email: email.value,
        password: password.value,
      });

      if (response.status === 200) {
        alert("Dane przesłane");
        navigation.navigate("Main");
      } else {
        throw new Error("error has occurred");
      }
    } catch (error) {
      alert(error.response.data);
    }
  };

  // useEffect(() => {
  //   onLoginPressed()
  // }, []);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#C1EBF2", "white", "#FF8FD2"]}
        style={styles.background}
      />

      <View style={styles.header}>
        <Text style={styles.title}>Welcome back!</Text>
        <Text style={styles.caption}>Sign in to your account to continue.</Text>
      </View>

      <View>

        <View>
          <Text style={styles.inputBoxName}>Email</Text>
          <TextInput
            label="email"
            placeholder="email"
            value={email.value}
            style={styles.inputBox}
            onChangeText={(text) => setEmail({ value: text, error: "" })}
          />
        </View>

        <View>
          <Text style={styles.inputBoxName}>Password</Text>
          <TextInput
            label="password"
            placeholder="password"
            value={password.value}
            style={styles.inputBox}
            onChangeText={(text) => setPassword({ value: text, error: "" })}
            secureTextEntry
          />
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
          <Text style={styles.clickableText}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity
          onPress={onLoginPressed}
          style={{
            borderColor: "#474146",
            borderRadius: 50,
            borderWidth: 1,
            margin: 15,
          }}
        >
          <GradientButton text="log in"></GradientButton>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.clickableText}>Or create a new account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
