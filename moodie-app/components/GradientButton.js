import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

export default function GradientButton({ text }) {
  return (
    <LinearGradient
      colors={["#C1EBF2", "#C6DCF9", "#A9C7EF"]}
      style={styles.button}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
      <Text
        style={{
          fontFamily: "Quicksand-Regular",
          fontSize: 20,
          color: "#474146",
        }}
      >
        {text}
      </Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    height: 65,
    width: 300,
  },
});
