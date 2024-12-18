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
import TabNavigator from "../components/TabNavigator";
import { useFonts } from "expo-font";
// import FrequencyScreen from "../components/FrequencyScreen";

const Stack = createNativeStackNavigator();

export default function HomeScreen() {
  const [fontsLoaded] = useFonts({
    "PlayfairDisplay-Regular": require("../assets/fonts/PlayfairDisplay-Regular.ttf"),
    "Quicksand-Regular": require("../assets/fonts/Quicksand-Regular.ttf"),
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
      {/* <Stack.Screen name="FrequencyScreen" component={FrequencyScreen} /> */}
    </Stack.Navigator>
  );
}
