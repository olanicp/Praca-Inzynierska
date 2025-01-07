import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text } from "react-native";
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
import TabNavigator from "../components/TabNavigator";
import EmotionIdentificationCarousel from "../components/EmotionIdentificationCarousel"
import { useFonts } from "expo-font";


const Stack = createNativeStackNavigator();

export default function HomeScreen() {
  const [fontsLoaded] = useFonts({
    "PlayfairDisplay-Regular": require("../assets/fonts/PlayfairDisplay-Regular.ttf"),
    "PlayfairDisplay-Bold": require("../assets/fonts/PlayfairDisplay-Bold.ttf"),
    "Quicksand-Regular": require("../assets/fonts/Quicksand-Regular.ttf"),    
    "Quicksand-Bold": require("../assets/fonts/Quicksand-Bold.ttf"),
  });
  if (!fontsLoaded) {
    return <Text>Loading fonts...</Text>;
  }
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
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
      <Stack.Screen name="Main" component={TabNavigator} />
      <Stack.Screen name="Calendar" component={CalendarScreen} />
      <Stack.Screen name="FrequencyScreen" component={FrequencyScreen} />
      <Stack.Screen name="IntensityScreen" component={IntensityScreen} />
      <Stack.Screen name="EmotionalSpectrumScreen" component={EmotionalSpectrumScreen} />
      <Stack.Screen name="EmotionListScreen" component={EmotionListScreen} />
      <Stack.Screen name="FeelingsScreen" component={FeelingsScreen} />
      <Stack.Screen name="ExploreScreen" component={ExploreScreen} />
      <Stack.Screen name="StreakScreen" component={StreakScreen} />
      <Stack.Screen name="EmotionIdentificationCarousel" component={EmotionIdentificationCarousel} />
    </Stack.Navigator>
  );
}
