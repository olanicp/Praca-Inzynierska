import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import GradientSlider from './GradientSlider'



export default function FrequencyScreen({ navigation }) {
  const [frequency, setFrequency] = useState(0); // Wartość suwaka od -1 (negatywne) do 1 (pozytywne)

  const handleNext = () => {
    console.log('Selected Frequency:', frequency);
    navigation.navigate('NextScreen');
  };

  return (
    <View style={styles.container}>
        <Text style={styles.title}>How would you describe the frequency of your current emotions?</Text>
        
        <GradientSlider transformation={{transform:[{rotate: "-90deg"}]}} orientation='vertical'/>
        {/* <GradientSlider orientation={'horizontal'}/> */}

      
        <View style={styles.labels}>
            <Text style={styles.labelText}>positive</Text>
            <Text style={styles.labelText}>neutral</Text>
            <Text style={styles.labelText}>negative</Text>
        </View>

        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>next</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 40,
    color: '#333333',
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
