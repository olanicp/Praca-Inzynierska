import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function ExploreScreenBoxes({ text, props, onValueChange }) {
  const [selectedProps, setselectedProps] = useState([]);

  const toggleMeal = (meal) => {
    setselectedProps((prev) =>
      prev.includes(meal)
        ? prev.filter((item) => item !== meal)
        : [...prev, meal]
    );
  };

  useEffect(() => {
    onValueChange(selectedProps);
  }, [selectedProps]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{text}</Text>
      <View style={styles.mealContainer}>
        {props.map((prop) => (
          <TouchableOpacity
            key={prop}
            style={[
              styles.mealButton,
              selectedProps.includes(prop) && styles.selectedMealButton,
            ]}
            onPress={() => toggleMeal(prop)}
          >
            <Text
              style={[
                styles.mealText,
                selectedProps.includes(prop) && styles.selectedMealText,
              ]}
            >
              {prop}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 40,
  },
  title: {
    fontFamily: "Quicksand-Regular",
    color: "#474146",
    fontSize: 25,
    textAlign: "center",
    marginBottom: 20,
  },
  mealContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 3,
  },
  mealButton: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    margin: 5,
  },
  selectedMealButton: {
    backgroundColor: "#c6dcf9",
  },
  mealText: {
    fontFamily: "Quicksand-Regular",
    color: "#474146",
    fontSize: 18,
  },
  addButton: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    margin: 5,
    justifyContent: "center",
  },
});
