import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import GradientButton from './GradientButton';
import GradientSlider from './GradientSlider';
const width = Dimensions.get('window').width


export default function FeelingsScreen({ navigation }) {
  const handleNext = () => {
    navigation.navigate('StreakScreen');
  };

  return (
    <View style={styles.container}>
        <View>
            <Text style={styles.text}>How many hours did you sleep last night?</Text>
            <View style={styles.sliderContainer}>
                <GradientSlider sliderWidth={width * 0.7}/>
            </View>
        </View>

        <View>
            <Text style={styles.text}>How much physical activity did you do today?</Text>
            <View style={styles.sliderContainer}>
                <GradientSlider sliderWidth={width * 0.7}/>
            </View>
        </View>
  
        <View >
            <TouchableOpacity onPress={handleNext}>
            <GradientButton text={"next"}/>
            </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff6fb',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 40,
    paddingBottom: 40,
    paddingLeft: 20,
    paddingRight: 20
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
  }
});
