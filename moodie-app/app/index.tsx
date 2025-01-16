import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, ActivityIndicator } from "react-native";
import LoginScreen from "../components/LoginScreen";
import WelcomeScreen from "../components/WelcomeScreen";
import SignupScreen from "../components/SignupScreen";
import ForgotPasswordScreen from "../components/ForgotPasswordScreen";
import ConfirmationCodeScreen from "../components/ConfirmationCodeScreen";
import ResetPasswordScreen from "../components/ResetPasswordScreen";
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
import { useFonts } from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const Stack = createNativeStackNavigator();

export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const [fontsLoaded] = useFonts({
    "PlayfairDisplay-Regular": require("../assets/fonts/PlayfairDisplay-Regular.ttf"),
    "PlayfairDisplay-Bold": require("../assets/fonts/PlayfairDisplay-Bold.ttf"),
    "Quicksand-Regular": require("../assets/fonts/Quicksand-Regular.ttf"),
    "Quicksand-Bold": require("../assets/fonts/Quicksand-Bold.ttf"),
  });

  useEffect(() => {
    if (!isInitialized) {
      const initializeAppSettings = async () => {
        try {
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
        } catch (error) {
          console.error("Error initializing app settings:", error);
        } finally {
          setIsInitialized(true);
        }
      };
      initializeAppSettings();
    }
  }, []);

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
      setIsLoading(false);
    };

    checkLoginStatus();
  }, []);

  if (isLoading || !fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
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
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
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
    </Stack.Navigator>
  );
}
