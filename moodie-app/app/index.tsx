import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../components/LoginScreen";
import WelcomeScreen from "../components/WelcomeScreen";
import SignupScreen from "../components/SignupScreen";
import ForgotPasswordScreen from "../components/ForgotPasswordScreen";
import ConfirmationCodeScreen from "../components/ConfirmationCodeScreen";
import ResetPasswordScreen from "./reset-password";
import ResetPasswordSuccessScreen from "../components/ResetPasswordSuccessScreen";
import CalendarScreen from "../components/CalendarScreen";
import FrequencyScreen from "../components/FrequencyScreen";
import IntensityScreen from "../components/IntensityScreen";
import EmotionalSpectrumScreen from "../components/EmotionalSpectrumScreen";
import EmotionListScreen from "../components/EmotionListScreen";
import FeelingsScreen from "../components/FeelingsScreen";
import ExploreScreen from "../components/ExploreScreen";
import StreakScreen from "../components/StreakScreen";
import JournalScreen from "../components/JournalScreen";
import TabNavigator from "../components/TabNavigator";
import EmotionIdentificationCarousel from "../components/EmotionIdentificationCarousel";
import ChangeName from "../components/ChangeName";
import ChangeEmail from "../components/ChangeEmail";
import ResetPasswordWhenLoggedScreen from "../components/ResetPasswordWhenLoggedScreen";
import { useFonts } from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState, useRef } from "react";
import * as SplashScreen from "expo-splash-screen";
import * as Linking from "expo-linking";

const Stack = createNativeStackNavigator();

export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  SplashScreen.preventAutoHideAsync();

  SplashScreen.setOptions({
    duration: 1000,
    fade: true,
  });

  const [fontsLoaded] = useFonts({
    "PlayfairDisplay-Regular": require("../assets/fonts/PlayfairDisplay-Regular.ttf"),
    "PlayfairDisplay-Bold": require("../assets/fonts/PlayfairDisplay-Bold.ttf"),
    "Quicksand-Regular": require("../assets/fonts/Quicksand-Regular.ttf"),
    "Quicksand-Bold": require("../assets/fonts/Quicksand-Bold.ttf"),
  });

  useEffect(() => {
    const getUrlAsync = async () => {
      const initialUrl = await Linking.getInitialURL();
      if (initialUrl) {
        const params = parseFragment(initialUrl);
        const token = params.access_token || "";
        try {
          await AsyncStorage.setItem('resetToken', token);
        } catch (error) {
          console.error("Error saving token to AsyncStorage:", error);
        }
      }
    }

    getUrlAsync();

    const handleUrl = async (event: { url: string }) => {
      const params = parseFragment(event.url);
      const token = params.access_token || "";
      const refreshToken = params.refresh_token || "";
      try {
        await AsyncStorage.setItem("resetToken", token);
        await AsyncStorage.setItem("refToken", refreshToken);

      } catch (error) {
        console.error("Error saving token to AsyncStorage:", error);
      }
    };


    const subscription = Linking.addEventListener("url", handleUrl);

    return () => {
      subscription.remove();
    };
  }, []);


  const parseFragment = (url: string) => {
    const fragment = url.split('#')[1];
    const params: { [key: string]: string } = {};
    if (fragment) {
      const regex = /([^&=]+)=([^&]*)/g;
      let match;
      while ((match = regex.exec(fragment)) !== null) {
        params[decodeURIComponent(match[1])] = decodeURIComponent(match[2]);
      }
    }
    return params;
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const userData = await AsyncStorage.getItem("userData");
        if (userData) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Error checking login status:", error);
      }
    };

    const initializeAppSettings = async () => {
      try {
        const appSettings = await AsyncStorage.getItem("userData");
        if (!appSettings) {
          const defaultSettings = {
            hasSeenIntro: false,
            theme: "light",
            language: "en",
            // notificationsEnabled: true,
          };
          await AsyncStorage.setItem(
            "appSettings",
            JSON.stringify(defaultSettings)
          );
        }
      } catch (error) {
        console.error("Error initializing app settings:", error);
      }
    };
    initializeAppSettings();
    checkLoginStatus();
    SplashScreen.hide();
    setIsLoading(false);

  }, []);

  if (isLoading || !fontsLoaded) {
    return null;
  }

  return (
    <Stack.Navigator
      initialRouteName={isLoggedIn ? "MainScreen" : "Welcome"}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen
        name="ConfirmationCode"
        component={ConfirmationCodeScreen}
      />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen}/>
      <Stack.Screen name="ResetPasswordWhenLoggedScreen" component={ResetPasswordWhenLoggedScreen}/>

      <Stack.Screen
        name="ResetPasswordSuccess"
        component={ResetPasswordSuccessScreen}
      />
      <Stack.Screen name="MainScreen" component={TabNavigator} />
      <Stack.Screen name="Calendar" component={CalendarScreen} />
      <Stack.Screen name="FrequencyScreen" component={FrequencyScreen} />
      <Stack.Screen name="IntensityScreen" component={IntensityScreen} />
      <Stack.Screen
        name="EmotionalSpectrumScreen"
        component={EmotionalSpectrumScreen}
      />
      <Stack.Screen name="EmotionListScreen" component={EmotionListScreen} />
      <Stack.Screen name="FeelingsScreen" component={FeelingsScreen} />
      <Stack.Screen name="ExploreScreen" component={ExploreScreen} />
      <Stack.Screen name="StreakScreen" component={StreakScreen} />
      <Stack.Screen
        name="EmotionIdentificationCarousel"
        component={EmotionIdentificationCarousel}
      />
      <Stack.Screen name="JournalScreen" component={JournalScreen} />
      <Stack.Screen name="ChangeNameScreen" component={ChangeName}/>
      <Stack.Screen name="ChangeEmailScreen" component={ChangeEmail}/>
    </Stack.Navigator>
  );
}
