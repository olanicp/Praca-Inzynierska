import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";
import FrequencyScreen from "./FrequencyScreen";
import IntensityScreen from "./IntensityScreen";
import EmotionalSpectrumScreen from "./EmotionalSpectrumScreen";
import EmotionListScreen from "./EmotionListScreen";
import FeelingsScreen from "./FeelingsScreen";
import ExploreScreen from "./ExploreScreen";
import StreakScreen from "./StreakScreen";
import GradientButton from "./GradientButton";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const { width: screenWidth } = Dimensions.get("window");

export default function EmotionIdentificationCarousel() {
  const navigation = useNavigation();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [frequencyValue, setFrequencyValue] = useState(0);
  const [intensityValue, setIntensityValue] = useState(0);
  const [emotions, setEmotions] = useState();
  const [userEmotions, setUserEmotions] = useState([]);
  const [quadrant, setQuadrant] = useState("");
  const [activities, setActivities] = useState({});
  const [streak, setStreak] = useState(0);
  const [loginDays, setLoginDays] = useState([]);

  const views = [
    {
      key: "frequency",
      component: (
        <FrequencyScreen onValueChange={(value) => setFrequencyValue(value)} />
      ),
    },
    {
      key: "intensity",
      component: (
        <IntensityScreen onValueChange={(value) => setIntensityValue(value)} />
      ),
    },
    {
      key: "emotionalspectrum",
      component: <EmotionalSpectrumScreen quadrant={quadrant} />,
    },
    {
      key: "EmotionListScreen",
      component: (
        <EmotionListScreen
          emotions={emotions}
          onValueChange={(value) => setUserEmotions(value)}
        />
      ),
    },
    {
      key: "FeelingsScreen",
      component: (
        <FeelingsScreen userEmotions={userEmotions} quadrant={quadrant} />
      ),
    },
    {
      key: "ExploreScreen",
      component: (
        <ExploreScreen onValueChange={(value) => setActivities(value)} />
      ),
    },
    {
      key: "StreakScreen",
      component: <StreakScreen streak={streak} loginDays={loginDays} />,
    },
  ];

  const flatListRef = useRef(null);

  const onViewRef = React.useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  });
  const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 });

  const handleNextPress = async () => {
    let emotionsIDs = [];
    if (currentIndex === 1) {
      try {
        const response = await axios.get("http://192.168.0.157:5000/emotions", {
          params: {
            x: frequencyValue,
            y: intensityValue,
          },
        });

        if (response.status === 200) {
          setQuadrant(response.data.quadrant);
          const emotionsWithDesc = response.data.emotions.map(
            (emotionObj, index) => ({
              emotionId: emotionObj.id,
              id: index.toString(),
              pleasantness: emotionObj.pleasantness,
              energy: emotionObj.energy,
              emotion: emotionObj.emotion,
              description: emotionObj.definition,
            })
          );
          setEmotions(emotionsWithDesc);
        } else {
          throw new Error("Błąd podczas pobierania emocji");
        }
      } catch (error) {
        console.error("Błąd żądania emocji:", error);
        alert("Nie udało się pobrać emocji. Spróbuj ponownie.");
      }
    }

    if (currentIndex < views.length - 2) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      flatListRef.current.scrollToIndex({ index: nextIndex });
    } else if (currentIndex === views.length - 1) {
      emotionsIDs = emotions
        .filter((emotion) =>
          userEmotions.some((userEmotion) => userEmotion === emotion.emotion)
        )
        .map((emotion) => emotion.emotionId);

      try {
        const userData = await AsyncStorage.getItem("userData");
        const userID = JSON.parse(userData).userId;
        const saveResponse = await axios.post(
          "http://192.168.0.157:5000/saveUserInterview",
          {
            emotionsIDs,
            quadrant,
            activities,
            userID,
          }
        );
        if (saveResponse.status === 200) {
          console.log("Dane zostały zapisane pomyślnie");
          navigation.navigate("MainScreen", {
            screen: "Main",
          });
        } else {
          console.error("Wystąpił problem podczas zapisywania danych");
        }
      } catch (error) {
        console.error("Błąd zapisu danych:", error);
      }
    } else {
      try {
        const userData = await AsyncStorage.getItem("userData");
        const fetchedUserData = userData ? JSON.parse(userData) : {};

        const userID = JSON.parse(userData).userId;
        const streakResponse = await axios.post(
          "http://192.168.0.157:5000/updateStreak",
          {
            userID,
          }
        );

        if (streakResponse.status === 200) {
          const newStreak = streakResponse.data.updatedData.streak;
          const newLoginDays = streakResponse.data.updatedData.login_days;
          setStreak(newStreak);
          setLoginDays(newLoginDays);
          const updatedUserData = {
            ...fetchedUserData,
            streak: newStreak,
            loginDays: newLoginDays,
          };
          await AsyncStorage.setItem(
            "userData",
            JSON.stringify(updatedUserData)
          );
          const nextIndex = currentIndex + 1;
          setCurrentIndex(nextIndex);
          flatListRef.current.scrollToIndex({ index: nextIndex });
        }
      } catch (error) {
        console.error("Błąd aktualizowania streak: ", error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={views}
        renderItem={({ item }) => (
          <View style={styles.slide}>{item.component}</View>
        )}
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
  },
});
