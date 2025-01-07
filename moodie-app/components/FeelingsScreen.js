import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";


export default function FeelingsScreen({ }) {
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
    paddingVertical: 40,
    paddingHorizontal: 20,
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
  }
});
