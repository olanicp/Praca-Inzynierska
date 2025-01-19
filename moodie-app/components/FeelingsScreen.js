import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "./MainAppStyles";

export default function FeelingsScreen({ userEmotions, quadrant }) {
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

  const formatEmotions = (userEmotions) => {
    if (userEmotions.length === 1) {
      return (
        <Text
          style={[
            styles.boldText,
            {
              fontSize: 36,
              marginTop: 30,
              marginBottom: 30,
            },
          ]}
        >
          {userEmotions[0]}
        </Text>
      );
    }
    if (userEmotions.length === 2) {
      return (
        <Text
          style={[
            styles.boldText,
            {
              fontSize: 36,
              marginTop: 30,
              marginBottom: 30,
            },
          ]}
        >
          {userEmotions[0]} <Text style={styles.regularText}>and</Text>{" "}
          {userEmotions[1]}
        </Text>
      );
    }
    return (
      <Text
        style={[
          styles.boldText,
          { fontSize: 36, marginTop: 30, marginBottom: 30 },
        ]}
      >
        {userEmotions[0]}, {userEmotions[1]}{" "}
        <Text style={styles.regularText}>and</Text> {userEmotions[2]}
      </Text>
    );
  };

  const emotionsText = formatEmotions(userEmotions);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={colors}
        locations={[0, 0.4, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.background}
      />
      <View style={styles.textContainer}>
        <Text style={styles.regularText}>You are feeling</Text>
        <View>{emotionsText}</View>
        <Text style={styles.regularText}>
          let's now explore what made you feel this way...
        </Text>
      </View>

      <View></View>
    </View>
  );
}
