import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import GradientSlider from './GradientSlider'
import GradientButton from './GradientButton';


export default function FrequencyScreen({ navigation }) {
  const [intensity, setIntensity] = useState(0); // Wartość suwaka od -1 (negatywne) do 1 (pozytywne)

  const handleNext = () => {
    navigation.navigate('EmotionalSpectrumScreen');
  };

  return (
    <View style={styles.container}>
      <View >
        <Text style={styles.title}>How would you describe the <Text style={{fontWeight:'bold'}}>intensity</Text> of your current emotions?</Text>
      </View>
      <View>
        <GradientSlider transformation={{transform:[{rotate: "-90deg"}]}} orientation='vertical' sliderHeight={180} thumbHeight={130} markHeight={30} borderRadius={30} gradientColors={["#FFF0FF", "#F5ABD6", "#D558A3"]}
        />
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
  slider:{
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: "Quicksand-Regular",
    color: "#474146",
    paddingHorizontal: 5,
    fontSize: 30,
    textAlign: 'center',
  },
  sliderBackground: {
    width: '80%',
    height: 300,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  slider: {
    width: '100%',
    height: 40,
    transform: [{ rotate: '-90deg' }], // Obrót suwaka do pionu
  },
  labels: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  labelText: {
    fontSize: 14,
    color: '#555555',
  },
  nextButton: {
    marginTop: 40,
    backgroundColor: '#96C3EB',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
