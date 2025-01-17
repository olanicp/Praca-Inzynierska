import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const quadrantStyles = {
  "high energy pleasant": {
    backgroundColor: "#83B2F1",
    borderRadius: 100 / 2,
  },
  "low energy pleasant": {
    backgroundColor: "#F5ABD0",
    borderRadius: 0,
  },
  "high energy unpleasant": {
    backgroundColor: "#A9DCC7",
    borderRadius: 20,
  },
  "low energy unpleasant": {
    backgroundColor: "#bfafe9",
    borderRadius: 5,
  },
};

export default function EmotionBoxes({ props }) {
  return (
    <View style={styles.container}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    marginVertical: 40,
  },
  title: {
    fontFamily: "Quicksand-Regular",
    color: "#474146",
    fontSize: 25,
    textAlign: "center",
    marginBottom: 20,
  },
  boxContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 50,
  },
  boxText: {
    fontFamily: "Quicksand-Regular",
    color: "#474146",
    fontSize: 18,
  },
});
