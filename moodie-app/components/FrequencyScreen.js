import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import GradientSlider from "./GradientSlider";

export default function FrequencyScreen({ onValueChange }) {
  const [frequency, setFrequency] = useState(0);

  const handleFrequencyChange = (newFrequency) => {
    setFrequency(newFrequency);
    onValueChange(newFrequency);
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>
          How would you describe the{" "}
          <Text style={{ fontWeight: "bold" }}>pleasantness</Text> of your
          current emotions?
        </Text>
      </View>
      <View>
        <GradientSlider
          transformation={{ transform: [{ rotate: "-90deg" }] }}
          stepCount={16}
          orientation="vertical"
          sliderHeight={180}
          thumbHeight={130}
          markHeight={30}
          borderRadius={30}
          sliderText={["negative", "positive"]}
          onValueChange={handleFrequencyChange}
        />
      </View>

      <View></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff6fb",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 60,
    paddingBottom: 120,
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: "Quicksand-Regular",
    color: "#474146",
    paddingHorizontal: 5,
    fontSize: 30,
    textAlign: "center",
  },
});
