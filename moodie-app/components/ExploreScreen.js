import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import GradientButton from './GradientButton';
import GradientSlider from './GradientSlider';
import ExploreScreenBoxes from './ExploreScreenBoxes';
const width = Dimensions.get('window').width


export default function FeelingsScreen({ onValueChange }) {
  const [interviewValues, setInterviewValues] = useState({
    sleepingHours: "",
    meals: "",
    exerciseHours: "",
    activities: ""
  });
  
  const handleSleepingHoursChange = (sleepingHours) => {
    setInterviewValues(prev => ({
      ...prev,
      sleepingHours: sleepingHours
    }));
    onValueChange && onValueChange({ ...interviewValues, sleepingHours });
  };

  const handleExerciseHoursChange = (exerciseHours) => {
    setInterviewValues(prev => ({
      ...prev,
      exerciseHours: exerciseHours
    }));
    onValueChange && onValueChange({ ...interviewValues, exerciseHours });
  };

  const handleMealsChange = (meals) => {
    setInterviewValues(prev => ({
      ...prev,
      meals: meals
    }));
    onValueChange && onValueChange({ ...interviewValues, meals });
  };

  const handleActivitiesChange = (activities) => {
    setInterviewValues(prev => ({
      ...prev,
      activities: activities
    }));
    onValueChange && onValueChange({ ...interviewValues, activities });
  };


  return (
    <ScrollView contentContainerStyle={styles.container}>
    
      <Text style={styles.text}>How many hours did you sleep last night?</Text>
      <View style={styles.sliderContainer}>
          <GradientSlider 
            sliderWidth={width * 0.7}
            onValueChange={handleSleepingHoursChange}
          />
      </View>

      <ExploreScreenBoxes 
        props={['breakfast', 'lunch', 'brunch', 'dinner', 'snacks', 'dessert', 'alcohol']}
        onValueChange={handleMealsChange}
      />

      <Text style={styles.text}>How much physical activity did you do today?</Text>
      <View style={styles.sliderContainer}>
          <GradientSlider 
            sliderWidth={width * 0.7} 
            isNumbers={false} 
            sliderText={["none", "light", "moderate", "intense"]}
            onValueChange={handleExerciseHoursChange}
          />
      </View>

      <ExploreScreenBoxes 
        props={['hanging out', 'work', 'rest', 'hobbies', 'school', 'TV', 'errands']}
        onValueChange={handleActivitiesChange}
      />

      <View>
        {/* <TouchableOpacity onPress={handleNext}>
          <GradientButton text={"next"}/>
        </TouchableOpacity> */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff6fb',
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 120,
    paddingHorizontal: 20
  },
  text: {
    fontFamily: "Quicksand-Regular",
    color: "#474146",
    fontSize: 25,
    textAlign: 'center',
    marginBottom: 30
  },
  sliderContainer: {
    marginVertical: 30
  },
});
