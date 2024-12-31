import React, { useState } from 'react';
import { View, Text, StyleSheet, PanResponder, Dimensions } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
const width = Dimensions.get('window').width

const GradientSlider = ({
  transformation = {},
  orientation = 'horizontal',
  sliderWidth = width * 0.9,
  sliderHeight = 30,
  thumbWidth = 23,
  thumbHeight = 60,
  markHeight = 10,
  stepCount = 10,
  borderRadius = 30,
  gradientColors = ["#A9C7EF", "#C6DCF9", "#F5ABD6"],
  sliderText = {},
  isNumbers = true,
}) => {
  const [value, setValue] = useState(0);
  const [textWidth, setTextWidth] = useState(0);
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

  const getLabel = (index) => {
    if (!sliderText || sliderText.length === 0) return null;

  const labelsCount = sliderText.length; // Liczba elementów w sliderText

  if (labelsCount === 3) {
    // Obsługa dla trzech słów
    if (index === 0) return sliderText[0];
    if (index === Math.floor(stepCount / 2)) return sliderText[1];
    if (index === stepCount) return sliderText[2];
  } else if (labelsCount === 4) {
    // Obsługa dla czterech słów
    if (index === 0) return sliderText[0];
    if (index === 3) return sliderText[1];
    if (index === 6) return sliderText[2];
    if (index === 10) return sliderText[3];
  }

  return null;
  };
  

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
            {marks.map((mark) => {
              const label = getLabel(mark);
              return isVertical ? (
                label ? (
                  <Text
                    key={mark}
                    onLayout={(event) => setTextWidth(event.nativeEvent.layout.width)}
                    style={[
                      { left: mark * stepWidth,  transform: [
                        { translateX: -textWidth / 2 }, // Dostosuj przesunięcie w poziomie (jeśli potrzeba)
                        { translateY: 0 }, // Przesunięcie w pionie (zmień wartość, by dopasować)
                        { rotate: '90deg' }, // Obrót o 90 stopni
                      ], 
                      position: 'absolute'
                    }
          
                    ]}
                  >{label}</Text>
                ) : (
                  <View
                  key={mark}
                  style={[
                    { left: mark * stepWidth, height: markHeight, width: 1, backgroundColor: 'black', position: 'absolute' },
                  ]}
                />
                )
              ) : (
                <View
                  key={mark}
                  style={[
                    styles.mark,
                    { left: mark * stepWidth },
                  ]}
                >
                  <View 
                    style={[
                      styles.markLine,
                      { height: markHeight, backgroundColor: 'black'},
                    ]}
                  />
                  <Text
                    style={[
                      styles.numbers,
                      isNumbers ? {} : {right: 25},
                    ]}
                  >
                    {isNumbers 
                      ? (mark === stepCount ? '10+' : mark) 
                      : getLabel(mark)
                    }
                  </Text>
                </View>
              )
            })}
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
    top: 10
  },
  markLine: {
    width: 1, // Increased width for visibility
    position: 'relative'
  },
  textMark: {
    position: 'absolute',
    fontFamily: "Quicksand-Regular",
    color: "#474146",
    fontSize: 20,
    transform: [{rotate: '90deg'}]
  },
  numbers: {
    fontFamily: 'Quicksand-Regular',
    color: '#474146',
    fontSize: 20,
    top: 25,
    right: 5
  },
});

export default GradientSlider;
