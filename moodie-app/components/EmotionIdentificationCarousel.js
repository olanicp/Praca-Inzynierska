import React, { useState, useRef  } from "react";
import { View, Text, StyleSheet, Dimensions, FlatList, TouchableOpacity } from "react-native";
import FrequencyScreen from "./FrequencyScreen";
import IntensityScreen from "./IntensityScreen";
import EmotionalSpectrumScreen from "./EmotionalSpectrumScreen";
import EmotionListScreen from "./EmotionListScreen";
import FeelingsScreen from "./FeelingsScreen";
import ExploreScreen from "./ExploreScreen";
import StreakScreen from "./StreakScreen";
import GradientButton from "./GradientButton";
import axios from "axios";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function EmotionIdentificationCarousel() {

  const [currentIndex, setCurrentIndex] = useState(0);
  const [frequencyValue, setFrequencyValue] = useState(0);
  const [intensityValue, setIntensityValue] = useState(0);
  const [emotions, setEmotions] = useState({});
  const [quadrant, setQuadrant] = useState("");

  const views = [
    { key: "frequency", component: <FrequencyScreen onValueChange={(value) => setFrequencyValue(value)}/> },
    { key: "intensity", component: <IntensityScreen  onValueChange={(value) => setIntensityValue(value)}/> },
    { key: "emotionalspectrum", component: <EmotionalSpectrumScreen quadrant={quadrant}/> },
    { key: "EmotionListScreen", component: <EmotionListScreen emotions={emotions}/> },
    { key: "FeelingsScreen", component: <FeelingsScreen/> },
    { key: "ExploreScreen", component: <ExploreScreen/> },
    { key: "StreakScreen", component: <StreakScreen/> }
  ];

  const flatListRef = useRef(null);

  const onViewRef = React.useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  });
  const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 });

  const handleNextPress = async () => {
    // console.log("Frequency Value:", frequencyValue);
    // console.log("Intensity Value:", intensityValue);

    if (currentIndex === 1) { 
        try {
          const response = await axios.get("http://192.168.0.157:5000/emotions", {
            params: {
              x: frequencyValue,
              y: intensityValue,
            },
          });
    
          if (response.status === 200) {
            const emotionsWithDesc = response.data.emotions.map((emotionObj, index) => ({
                id: index.toString(), 
                emotion: emotionObj.emotion,
                description: emotionObj.definition,
              }));
      
            setEmotions(emotionsWithDesc);
            setQuadrant(response.data.quadrant);
            // console.log("Pobrany przedział:",response.data.quadrant);

          } else {
            throw new Error("Błąd podczas pobierania emocji");
          }
        } catch (error) {
          console.error("Błąd żądania emocji:", error);
          alert("Nie udało się pobrać emocji. Spróbuj ponownie.");
        }
    }

    if (currentIndex < views.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);

      flatListRef.current.scrollToIndex({ index: nextIndex });
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={views}
        renderItem={({ item }) => <View style={styles.slide}>{item.component}</View>}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.key}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
      />

      <View style={styles.progressContainer}>
        {views.map((_, index) => (
          <View
            key={index}
            style={[
              styles.progressDot,
              currentIndex === index ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>

      <TouchableOpacity
        style={styles.nextButtonContainer}
        onPress={handleNextPress}
      >
        <GradientButton text={"next"} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  progressContainer: {
    position: "absolute",
    top: 30, 
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  progressDot: {
    width: 20,
    height: 4,
    borderRadius: 2,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: "#6B6BD6", 
  },
  inactiveDot: {
    backgroundColor: "#D3D3D3", 
  },
  slide: {
    width: screenWidth,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  nextButtonContainer: {
    position: "absolute",
    bottom: 50,
    alignSelf: "center",
  }
});
