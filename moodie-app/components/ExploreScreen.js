import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import GradientButton from './GradientButton';
import GradientSlider from './GradientSlider';
import ExploreScreenBoxes from './ExploreScreenBoxes';
const width = Dimensions.get('window').width


export default function FeelingsScreen({ navigation }) {
  const handleNext = () => {
    navigation.navigate('StreakScreen');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
    
      <Text style={styles.text}>How many hours did you sleep last night?</Text>
      <View style={styles.sliderContainer}>
          <GradientSlider sliderWidth={width * 0.7}/>
      </View>

      <ExploreScreenBoxes/>

      <Text style={styles.text}>How much physical activity did you do today?</Text>
      <View style={styles.sliderContainer}>
          <GradientSlider sliderWidth={width * 0.7} isNumbers={false} sliderText={["none", "light", "moderate", "intense"]}/>
      </View>

      <ExploreScreenBoxes />

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
