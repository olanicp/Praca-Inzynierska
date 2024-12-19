import React, { useState } from 'react';
import { View, Text, StyleSheet, PanResponder, Dimensions } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
const width = Dimensions.get('window').width

const GradientSlider = ({
  transformation = {},
  orientation = 'horizontal',
  sliderWidth = width * 0.9,
  sliderHeight = 30,
  thumbWidth = 20,
  thumbHeight = 60,
  markHeight = 10,
  stepCount = 10,
  borderRadius = 30,
  gradientColors = ["#A9C7EF", "#C6DCF9", "#F5ABD6"],
  sliderText = {}
}) => {
  const [value, setValue] = useState(0);
  const marks = Array.from({ length: stepCount + 1 }, (_, i) => i);
  const isVertical = orientation === 'vertical';
  const stepWidth = sliderWidth / stepCount;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      let offset = isVertical ? -gestureState.dy : gestureState.dx;
      let newValue = Math.round(offset / stepWidth) + value;
      newValue = Math.max(0, Math.min(stepCount, newValue));
      setValue(newValue); 
      console.log(value);
    },
  });

  return (
      <View style={[styles.sliderContainer, { width: sliderWidth  + 50, height: sliderHeight}, transformation]}>
        <View style={[styles.track, { width: sliderWidth, height: sliderHeight }]} {...panResponder.panHandlers}>
          <LinearGradient
            colors={gradientColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.sliderContainer, { width: sliderWidth + 50, height: sliderHeight, borderRadius}]}
          />
          <View
            style={[
              styles.thumb,
              {
                left: value * stepWidth - thumbWidth / 2,
                width: thumbWidth,
                height: thumbHeight,
                borderRadius: sliderHeight / 2,
              },
            ]}
          />
          <View style={[styles.marksContainer, { width: sliderWidth, height: sliderHeight }]}>
            {marks.map((mark) => (
              <View
                key={mark}
                style={[
                  styles.mark,
                  { left: mark * stepWidth, height: markHeight },
                ]}
              />
            ))}
          </View>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  track: {
    borderRadius: 10,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center'
  },
  thumb: {
    position: 'absolute',
    backgroundColor: '#FFFFFF80',
    borderWidth: 1
  },
  marksContainer: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mark: {
    position: 'absolute',
    width: 1,
    backgroundColor: 'black',
  },
});

export default GradientSlider;
