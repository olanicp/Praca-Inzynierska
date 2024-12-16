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
      const response = await axios.post("http://192.168.43.115:5000/signup", {
        name: name.value,
        email: email.value,
        password: password.value,
      });

      if (response.status === 200) {
        alert("Dane przesłane");
        navigation.navigate("Login");
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
        <Text style={styles.title}>Create account</Text>
        <Text style={styles.caption}>Fill out all fields to continue.</Text>
      </View>

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
        <Text style={styles.forgot}>Or log in to an existing account</Text>
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
    fontSize: 18,
    paddingTop: 15,
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
