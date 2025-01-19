import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "./MainAppStyles";

export default function EmotionalSpectrumScreen({ quadrant }) {
  const [colors, setColors] = useState(["#C1EBF2", "#ffffff", "#A9C7EF"]);

  const getGradientColors = (quadrant) => {
    switch (quadrant) {
      case "low energy unpleasant":
        return ["#C1EBF2", "#ffffff", "#A9C7EF"];
      case "low energy pleasant":
        return ["#A9EFE8", "#ffffff", "#C1F2D2"];
      case "high energy unpleasant":
        return ["#E48281", "#ffffff", "#E77EAF"];
      case "high energy pleasant":
        return ["#E4AF81", "#ffffff", "#EFE1A9"];
      default:
        return ["#C1EBF2", "#ffffff", "#A9C7EF"];
    }
  };

  useEffect(() => {
    const newColors = getGradientColors(quadrant);
    setColors(newColors);
  }, [quadrant]);

  return (
    <View
      style={[
        styles.container,
        {
          alignItems: "center",
        },
      ]}
    >
      <LinearGradient
        colors={colors}
        locations={[0, 0.4, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.background}
      />
      <View style={styles.textContainer}>
        <Text style={styles.regularText}>Looks like today you are in the</Text>
        <View>
          <Text
            style={[
              styles.boldText,
              {
                fontSize: 40,
                marginTop: 30,
                marginBottom: 30,
              },
            ]}
          >
            {quadrant}
          </Text>
        </View>
        <Text style={styles.regularText}>emotional spectrum</Text>
      </View>
    </View>
  );
}
