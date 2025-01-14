import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import GradientButton from "./GradientButton";
import { styles } from "./CredentialScreenStyles";
import axios from "axios";

function emailValidator(email) {
  const re = /\S+@\S+\.\S+/;
  if (!email) return "Email can't be empty.";
  if (!re.test(email)) return "Ooops! We need a valid email address.";
  return "";
}

function nameValidator(name) {
  if (!name) return "Name can't be empty.";
  return "";
}

function passwordValidator(password) {
  if (!password) return "Password can't be empty.";
  if (password.length < 5)
    return "Password must be at least 5 characters long.";
  return "";
}

export default function SignupScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });

  const onSignUpPressed = async (event) => {
    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    try {
      const response = await axios.post(
        "https://backend-qat1.onrender.com/register",
        {
          //for testing purposes change to the local ip address of the emulator
          name: name.value,
          email: email.value,
          password: password.value,
        }
      );

      if (response.status === 200) {
        alert("Dane przesłane");
        navigation.navigate("Login");
      } else {
        throw new Error("error has occurred");
      }
    } catch (error) {
      alert("ups");
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
        <Text style={styles.title}>Create account</Text>
        <Text style={styles.caption}>Fill out all fields to continue.</Text>
      </View>

      <View>
        <View>
          <Text style={styles.inputBoxName}>Name</Text>
          <TextInput
            label="name"
            placeholder="name"
            value={name.value}
            style={styles.inputBox}
            onChangeText={(text) => setName({ value: text, error: "" })}
          />
          {Boolean(name.error) && (
            <Text style={{ color: "red" }}>{name.error}</Text>
          )}
        </View>

        <View>
          <Text style={styles.inputBoxName}>Email</Text>
          <TextInput
            label="email"
            placeholder="email"
            value={email.value}
            style={styles.inputBox}
            onChangeText={(text) => setEmail({ value: text, error: "" })}
          />
          {Boolean(email.error) && (
            <Text style={{ color: "red" }}>{email.error}</Text>
          )}
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
          {Boolean(password.error) && (
            <Text style={{ color: "red" }}>{password.error}</Text>
          )}
        </View>

        <View>
          <Text style={styles.inputBoxName}>Repeat password</Text>

          <TextInput
            label="password"
            placeholder="password"
            value={password.value}
            style={styles.inputBox}
            onChangeText={(text) => setPassword({ value: text, error: "" })}
            secureTextEntry
          />
          {Boolean(password.error) && (
            <Text style={{ color: "red" }}>{password.error}</Text>
          )}
        </View>
      </View>
      <View>
        <TouchableOpacity
          onPress={onSignUpPressed}
          style={{
            borderColor: "#474146",
            borderRadius: 50,
            borderWidth: 1,
            margin: 15,
          }}
        >
          <GradientButton text="sign up"></GradientButton>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.clickableText}>
            Or log in to an existing account
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
