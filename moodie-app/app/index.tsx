import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, StyleSheet } from 'react-native';
import LoginScreen from "../components/LoginScreen";
import WelcomeScreen from "../components/WelcomeScreen";
import SignupScreen from "../components/SignupScreen";
import MainScreen from "../components/MainScreen";
import FrequencyScreen from "../components/FrequencyScreen";


const Stack = createNativeStackNavigator();

export default function HomeScreen() {
  return (
      <Stack.Navigator initialRouteName='Welcome'>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="FrequencyScreen" component={FrequencyScreen} />
      </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});