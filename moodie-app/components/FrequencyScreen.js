import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import GradientSlider from './GradientSlider'
import GradientButton from './GradientButton';


export default function FrequencyScreen({ navigation }) {
  const [frequency, setFrequency] = useState(0); // Wartość suwaka od -1 (negatywne) do 1 (pozytywne)

  const handleNext = () => {
    navigation.navigate('IntensityScreen');
  };

  return (
    <View style={styles.container}>
      <View >
        <Text style={styles.title}>How would you describe the <Text style={{fontWeight:'bold'}}>frequency</Text> of your current emotions?</Text>
      </View>
      <View>
        <GradientSlider transformation={{transform:[{rotate: "-90deg"}]}} orientation='vertical' sliderHeight={180} thumbHeight={130} markHeight={30} borderRadius={30} sliderText={["positive", "neutral", "negative"]}/>
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
    paddingVertical: 40,
    paddingHorizontal: 20
  },
  title: {
    fontFamily: "Quicksand-Regular",
    color: "#474146",
    paddingHorizontal: 5,
    fontSize: 30,
    textAlign: 'center',
  }
});
