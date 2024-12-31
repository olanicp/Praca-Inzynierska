import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import AntDesign from "@expo/vector-icons/AntDesign";

export default function ExploreScreenBoxes() {
  const [selectedMeals, setSelectedMeals] = useState([]);

  const meals = ['breakfast', 'lunch', 'brunch', 'dinner', 'snacks', 'dessert', 'alcohol'];

  const toggleMeal = (meal) => {
    setSelectedMeals((prev) =>
      prev.includes(meal) ? prev.filter((item) => item !== meal) : [...prev, meal]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What meals did you have today?</Text>
      <View style={styles.mealContainer}>
        {meals.map((meal) => (
          <TouchableOpacity
            key={meal}
            style={[
              styles.mealButton,
              selectedMeals.includes(meal) && styles.selectedMealButton,
            ]}
            onPress={() => toggleMeal(meal)}
          >
            <Text
              style={[
                styles.mealText,
                selectedMeals.includes(meal) && styles.selectedMealText,
              ]}
            >
              {meal}
            </Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.addButton}>
          <AntDesign name="plus" size={20} color="#474146"/>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 40
  },
  title: {
    fontFamily: "Quicksand-Regular",
    color: "#474146",
    fontSize: 25,
    textAlign: 'center',
    marginBottom: 20
  },
  mealContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 3,
  },
  mealButton: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    margin: 5
  },
  selectedMealButton: {
    backgroundColor: '#c6dcf9',
  },
  mealText: {
    fontFamily: "Quicksand-Regular",
    color: "#474146",
    fontSize: 18
  },
  addButton: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    margin: 5,
    justifyContent:'center'
  }
});
