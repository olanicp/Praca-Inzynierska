import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import GradientButton from "./GradientButton";

export default function WelcomeScreen() {
  const navigation = useNavigation();
  const goToLoginScreen = () => {
    navigation.navigate("Login");
  };

  const goToSignupScreen = () => {
    navigation.navigate("Signup");
  };

  const loginAsGuest = () => {
    navigation.navigate("Main");
  };
  return (
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
