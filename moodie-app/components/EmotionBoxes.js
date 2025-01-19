import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { styles } from "./MainAppStyles";
const quadrantStyles = {
  "high energy pleasant": {
    backgroundColor: "#F3DAA0",
    borderRadius: 20,
  },
  "low energy pleasant": {
    backgroundColor: "#A9DCC7",
    borderRadius: 50,
  },
  "high energy unpleasant": {
    backgroundColor: "#EF9EA9",
    borderRadius: 0,
  },
  "low energy unpleasant": {
    backgroundColor: "#A6C1F0",
    borderRadius: 10,
  },
};

export default function EmotionBoxes({ props }) {
  return (
    <View
      style={[
        styles.container,
        {
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: 20,
          marginVertical: 20,
        },
      ]}
    >
      {props.map((prop, index) => (
        <View
          key={index}
          style={[styles.boxContainer, quadrantStyles[prop.quadrants]]}
        >
          <Text style={[styles.boxText]}>{prop.emotion}</Text>
        </View>
      ))}
    </View>
  );
}
