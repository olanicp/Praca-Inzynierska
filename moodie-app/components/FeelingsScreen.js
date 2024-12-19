import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import GradientButton from './GradientButton';
import { LinearGradient } from "expo-linear-gradient";


export default function FeelingsScreen({ navigation }) {
  const handleNext = () => {
    navigation.navigate('ExploreScreen');
  };

  return (
    <View style={styles.container}>
    <LinearGradient
                colors={["#c4ecf2", "#ffffff", "#b4cef1"]}
                locations={[0, 0.4, 1]}
                start={{ x: 0, y: 0 }} 
                end={{ x: 1, y: 1 }}
                style={styles.background}
                />
      <View style={styles.textContainer}>
        <Text style={styles.text}>You are feeling</Text>
            <View><Text style={[styles.text, {fontWeight:'bold', fontSize: 40, marginTop: 30, marginBottom: 30}]}>lost <Text style={{fontWeight:'normal'}}>and</Text> disconnected</Text></View>
        <Text style={styles.text}>let's now explore what made you feel this way...</Text>
      </View>
  
      <View >
        <TouchableOpacity onPress={handleNext}>
          <GradientButton text={"continue"}/>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1ffff',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 40,
    paddingBottom: 40,
    paddingLeft: 20,
    paddingRight: 20
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "900",
  },
  textContainer:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
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
