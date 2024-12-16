import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import GradientButton from "./GradientButton";
import axios from "axios";

export default function ForgotPasswordScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState({ value: "", error: "" });

  const onSubmitPressed = async (event) => {
    try {
      const response = await axios.post(
        "http://192.168.43.115:5000/reset-password",
        {
          email: email.value,
        }
      );

      if (response.status === 200) {
        alert("Dane przesłane");
        navigation.navigate("VerificationCode");
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
        <Text style={styles.forgot}>Or go back to login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 900,
  },
  header: {
    alignItems: "center",
  },
  title: {
    fontFamily: "PlayfairDisplay-Regular",
    color: "#474146",
    fontSize: 42,
  },
  caption: {
    fontFamily: "Quicksand-Regular",
    color: "#474146",
    fontSize: 16,
    padding: 15,
  },
  inputBox: {
    fontFamily: "Quicksand-Regular",
    marginTop: 10,
    paddingLeft: 30,
    width: 300,
    height: 50,
    borderRadius: 50,
    borderColor: "#474146",
    borderWidth: 1,
    backgroundColor: "white",
  },
  inputBoxName: {
    fontFamily: "Quicksand-Regular",
    color: "#474146",
    fontSize: 16,
    paddingTop: 25,
    paddingLeft: 15,
  },
  forgot: {
    fontFamily: "Quicksand-Regular",
    color: "#474146",
    padding: 15,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    height: 65,
    width: 300,
  },
});
