import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { styles } from "./MainAppStyles";
import { useNavigation} from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import GradientButton from "./GradientButton";
import Header from "./Header";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function MainScreen() {
  const [userEmotions, setUserEmotions] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const loadEmotions = async () => {
      try{
        let result = await AsyncStorage.getItem("userEmotions");
        const storedEmotions = JSON.parse(result);
        if (storedEmotions) {
          // setUserEmotions(JSON.parse(storedEmotions));
          if (storedEmotions.length === 1) {
            return setUserEmotions(
              <Text style={[{fontWeight:'bold', fontSize: 40, marginTop: 30, marginBottom: 30}]}>
                {storedEmotions[0]}
              </Text>
            );
          }
          if (storedEmotions.length === 2) {
            return setUserEmotions(
              <>
                {storedEmotions[0]} <Text style={{ fontWeight: 'normal' }}>and</Text> {storedEmotions[1]}
              </>
            );
          }
          return setUserEmotions(
            <Text style={[ {fontWeight:'bold', fontSize: 40, marginTop: 30, marginBottom: 30}]}>
              {storedEmotions[0]}, {storedEmotions[1]} <Text style={{ fontWeight: 'normal' }}>and</Text> {storedEmotions[2]}
            </Text>
          );
        }
      }catch (error) {
        console.error("Błąd odczytu danych:", error);
      }
    };

    console.log(userEmotions)
    loadEmotions();
  }, []);
    
  

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#F5ABD6", "#C4C1F2", "white"]}
        locations={[0, 0.22, 1]}
        style={styles.background}
      />
      <Header />
      <View style={styles.body}>
        {
          userEmotions ? (
            <View style={styles.bodyBubble}>
               <Text style={styles.greetingText}>Today you are feeling</Text>
               <Text style={styles.questionText}>{userEmotions}</Text>
            </View>
          ) : (
            <View style={styles.bodyBubble}>
              <Text style={styles.greetingText}>Hi, Emma!</Text>
              <Text style={styles.questionText}>How are you feeling today?</Text>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => navigation.navigate("EmotionIdentificationCarousel")}
              >
                <GradientButton
                  text={"Let's find out together! →"}
                ></GradientButton>
              </TouchableOpacity>
            </View>
          )
        }
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Something on your mind?</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Write your thoughts here..."
            placeholderTextColor="#A0A0A0"
            multiline
          />
        </View>
      </View>
    </View>
  );
}
