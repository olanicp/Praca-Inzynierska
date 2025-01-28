import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import GradientButton from "./GradientButton";
import AppIntroSlider from "react-native-app-intro-slider";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const slides = [
  {
    key: "slide1",
    image: require("../assets/images/slides/slide1.png"),
    backgroundColor: "#fff",
    width: "100%",
  },
  {
    key: "slide2",
    image: require("../assets/images/slides/slide2.png"),
    backgroundColor: "#fff",
    width: "100%",
  },
  {
    key: "slide3",
    image: require("../assets/images/slides/slide3.png"),
    backgroundColor: "#fff",
    width: "100%",
  },
  {
    key: "slide4",
    image: require("../assets/images/slides/slide4.png"),
    backgroundColor: "#fff",
    width: "100%",
  },
];

export default function WelcomeScreen() {
  const navigation = useNavigation();

  const [shouldShowIntro, setShouldShowIntro] = useState(false);

  useEffect(() => {
    const fetchShowIntro = async () => {
      try {
        const settings = await AsyncStorage.getItem("appSettings");
        const parsedSettings = JSON.parse(settings);
        console.log(parsedSettings);
        if (parsedSettings.hasSeenIntro === false) {
          setShouldShowIntro(true);
        } else {
          setShouldShowIntro(false);
        }
      } catch (error) {
        console.error("Błąd odczytu intro:", error);
        setShouldShowIntro(false);
      }
    };

    fetchShowIntro();
  }, []);

  const markIntroSeen = async () => {
    try {
      const appSettings = await AsyncStorage.getItem("appSettings");
      const parsedSettings = JSON.parse(appSettings);

      const updatedSettings = { ...parsedSettings, hasSeenIntro: true };

      await AsyncStorage.setItem(
        "appSettings",
        JSON.stringify(updatedSettings)
      );

      console.log("Intro marked as seen.");
    } catch (error) {
      console.error("Error updating app settings:", error);
    }
  };

  const onDone = async () => {
    try {
      await markIntroSeen();
    } catch (error) {
      console.error("Błąd zapisu intro:", error);
    }
    setShouldShowIntro(false);
  };

  const onSkip = async () => {
    try {
      await markIntroSeen();
    } catch (error) {
      console.error("Błąd zapisu intro:", error);
    }
    setShouldShowIntro(false);
  };

  const RenderItem = ({ item }) => {
    return (
      <ImageBackground
        style={{ flex: 1, resizeMode: "cover" }}
        source={item.image}
      ></ImageBackground>
    );
  };

  const goToLoginScreen = () => {
    navigation.navigate("Login");
  };

  const goToSignupScreen = () => {
    navigation.navigate("Signup");
  };

  const loginAsGuest = async () => {
    try {
      const response = await axios.post(
        "https://backend-qat1.onrender.com/enter-as-guest"
      );

      if (response.status === 200) {
        const { userID, email, name } = response.data.user;

        const streakResponse = await axios.get(
          "https://backend-qat1.onrender.com/getStreak",
          {
            params: {
              userID: userID,
            },
          }
        );

        if (streakResponse.status === 200) {
          const streak = streakResponse.data.streakData.streak;
          const lastInterviewedAt =
            streakResponse.data.streakData.interviewedAt;
          const loginDays = streakResponse.data.streakData.loginDays;
          const userData = {
            userId: userID,
            email: email,
            name: name,
            streak: JSON.stringify(streak),
            lastInterviewedAt: JSON.stringify(lastInterviewedAt),
            loginDays: JSON.stringify(loginDays),
            isAnonymous: true,
          };
          await AsyncStorage.setItem("userData", JSON.stringify(userData));
        }
        navigation.navigate("MainScreen", {
          screen: "Main",
        });
      } else {
        throw new Error("error has occurred");
      }
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  return (
    <>
      {!shouldShowIntro ? (
        <View style={styles.container}>
          <ImageBackground
            style={styles.background}
            source={require("../assets/images/welcome-background.png")}
          ></ImageBackground>
          <View style={styles.header}>
            <Text style={styles.title}>moodie</Text>
            <Text style={styles.subtitle}>
              your personal self reflection assistant
            </Text>
          </View>

          <View style={styles.menu}>
            <TouchableOpacity onPress={goToLoginScreen} style={styles.button}>
              <GradientButton text="log in"></GradientButton>
            </TouchableOpacity>

            <TouchableOpacity onPress={goToSignupScreen} style={styles.button}>
              <GradientButton text="sign up"></GradientButton>
            </TouchableOpacity>

            <TouchableOpacity onPress={loginAsGuest}>
              <Text style={styles.subtitle}>enter as guest</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <AppIntroSlider
          data={slides}
          renderItem={RenderItem}
          onDone={onDone}
          showSkipButton={true}
          onSkip={onSkip}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  header: {
    alignItems: "center",
  },
  title: {
    fontFamily: "PlayfairDisplay-Regular",
    fontSize: 64,
    color: "#474146",
  },
  subtitle: {
    fontFamily: "Quicksand-Regular",
    fontSize: 18,
    color: "#474146",
  },
  menu: {
    alignItems: "center",
  },
  button: {
    borderColor: "#474146",
    borderRadius: 50,
    borderWidth: 1,
    margin: 15,
  },
});
