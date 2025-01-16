import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { styles } from "./MainAppStyles";
import axios from "axios";
import GradientButton from "./GradientButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";

export default function JournalScreen({ route, navigation }) {
  const { entry = null, onSave } = route.params || {};
  const [text, setText] = useState(entry);

  const saveEntry = async () => {
    try {
      const userData = await AsyncStorage.getItem("userData");
      const userID = JSON.parse(userData).userId;
      const response = await axios.post(
        "https://backend-qat1.onrender.com/journal-entry",
        {
          userID,
          entry: text,
        }
      );
      if (response.status === 200) {
        onSave(text);
        navigation.goBack();
      } else {
        throw new Error("error has occurred");
      }
    } catch (error) {
      alert(error.response.data.Text);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.headerBubble}
        >
          <AntDesign
            style={styles.goBackIcon}
            name="left"
            size={32}
            color="#474146"
          />
        </TouchableOpacity>
      </View>

      <View style={[styles.body, styles.menu]}>
        <>
          <Text style={styles.questionText}>What's on your mind?</Text>
          <Text style={styles.detailText}>Try writing about:</Text>
          <Text style={styles.smallDetailText}>
            • what happened to you today?
          </Text>
          <Text style={styles.smallDetailText}>
            • what are you grateful for?
          </Text>
          <Text style={styles.smallDetailText}>
            • what would you like to do tomorrow?
          </Text>
        </>

        <View style={[styles.inputSection]}>
          <TextInput
            style={styles.textInput}
            placeholderTextColor="#A0A0A0"
            multiline
            value={text}
            onChangeText={setText}
          />
        </View>

        <TouchableOpacity
          onPress={saveEntry}
          style={{
            borderColor: "#474146",
            borderRadius: 50,
            borderWidth: 1,
            margin: 15,
            alignSelf: "center",
            bottom: 0,
          }}
        >
          <GradientButton text={"save"} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
