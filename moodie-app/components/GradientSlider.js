import React, { useState } from 'react';
import { View, Text, StyleSheet, PanResponder, Dimensions } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get('window');

const SLIDER_WIDTH = width - 100; 
const SLIDER_HEIGHT = 20; 
const THUMB_WIDTH = 20;
const THUMB_HEIGHT = 60;
const MARK_HEIGHT = 10;
const STEP_COUNT = 10; 

const GradientSlider = ({transformation, orientation}) => {
  const [value, setValue] = useState(0);
  const marks = Array.from({ length: STEP_COUNT + 1}, (_, i) => i);
  const isVertical = orientation === 'vertical';
  const stepWidth = SLIDER_WIDTH / STEP_COUNT;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      let offset = isVertical ? -gestureState.dy : gestureState.dx;
      let newValue = Math.round(offset / stepWidth) + value;
      newValue = Math.max(0, Math.min(STEP_COUNT, newValue));
      setValue(newValue); 
      console.log(value);
    },
  });

  return (
    <View style={[styles.container, transformation]}>
      <View style={styles.sliderContainer}>
        <View style={styles.track} {...panResponder.panHandlers}>
          <LinearGradient
            colors={["#A9C7EF", "#C6DCF9", "#F5ABD6"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.sliderContainer}
          ></LinearGradient>
          <View
            style={[styles.thumb, 
              { left: value * stepWidth - SLIDER_HEIGHT / 2},
            ]}
          />
          {/* Kreski */}
          <View style={styles.marksContainer}>
            {marks.map((mark) => (
              <View key={mark} style={[styles.mark, { left: mark * stepWidth }]}>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: width
  },
  sliderContainer: {
    width: SLIDER_WIDTH + 50,
    height: SLIDER_HEIGHT + 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SLIDER_HEIGHT / 2,
  },
  track: {
    width: SLIDER_WIDTH,
    height: SLIDER_HEIGHT,
    borderRadius: 10,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumb: {
    position: 'absolute',
    width: THUMB_WIDTH,
    height: THUMB_HEIGHT,
    backgroundColor: '#FFFFFF80',
    borderWidth: 1,
    borderRadius: SLIDER_HEIGHT / 2,
  },
  marksContainer: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: SLIDER_HEIGHT,
    width: SLIDER_WIDTH,
  },
  mark: {
    position: 'absolute',

    width: 1,
    borderWidth: 0.1,
    backgroundColor: 'black',
    height: MARK_HEIGHT,
  },
});

export default GradientSlider;