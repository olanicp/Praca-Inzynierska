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
import AsyncStorage from "@react-native-async-storage/async-storage";

const slides = [
  {
    key: "slide1",
    text: "First Slide",
    title: "First Slide Text",
    image: require("../assets/images/favicon.png"),
    backgroundColor: "#20d2bb",
  },
  {
    key: "slide2",
    text: "Second Slide",
    title: "Second Slide Text",
    image: require("../assets/images/favicon.png"),
    backgroundColor: "#20d2bb",
  },
  {
    key: "slide3",
    text: "Third Slide",
    title: "Third Slide Text",
    image: require("../assets/images/favicon.png"),
    backgroundColor: "#20d2bb",
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
      <View
        style={{
          flex: 1,
          backgroundColor: item.backgroundColor,
          alignItems: "center",
          justifyContent: "space-around",
          paddingBottom: 100,
        }}
      >
        <Text style={styles.introTitle}>{item.title}</Text>
        <Image style={styles.introImage} source={item.image} />
        <Text style={styles.introText}>{item.text}</Text>
      </View>
    );
  };

  const goToLoginScreen = () => {
    navigation.navigate("Login");
  };

  const goToSignupScreen = () => {
    navigation.navigate("Signup");
  };

  const loginAsGuest = () => {
    navigation.navigate("MainScreen", {
      screen: "Main",
    });
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
