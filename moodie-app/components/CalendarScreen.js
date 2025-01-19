import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { Calendar } from "react-native-calendars";
import { styles } from "./MainAppStyles";
import Header from "./Header";
import { quadrantColors } from "../constants/colors";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getMoodData = async () => {
  const userData = await AsyncStorage.getItem("userData");
  const userID = JSON.parse(userData).userId;
  const response = await axios.get(
    "https://backend-qat1.onrender.com/user/entry-days",
    {
      params: { userID },
    }
  );
  return response.data;
};

export default function CalendarScreen() {
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState(null);
  const [dayDetails, setDayDetails] = useState(null);

  const [moodData, setMoodData] = useState([]);

  useEffect(() => {
    getMoodData().then((data) => {
      setMoodData(data);
    });
  }, []);

  const formatMoodData = (data) => {
    const moodDataObject = {};
    data.forEach((entry) => {
      const date = entry.date;

      // const color =
      //   mood === "happy" ? "green" : mood === "sad" ? "red" : "blue";

      moodDataObject[date] = {
        customStyles: {
          container: {
            backgroundColor: "#F5ABD6",
            borderRadius: 50,
          },
        },
      };
    });
    return moodDataObject;
  };

  const markedDates = formatMoodData(moodData);

  const fetchDayData = async (date) => {
    setSelectedDate(date);
    const userData = await AsyncStorage.getItem("userData");
    const userID = JSON.parse(userData).userId;
    const response = await axios.get(
      "https://backend-qat1.onrender.com/user/daily-history",
      {
        params: { userID, date },
      }
    );
    setDayDetails(response.data);
  };

  const getExerciseCategory = (hours) => {
    const numericHours = parseFloat(hours);
    if (numericHours >= 9 && numericHours <= 10) {
      return "intense";
    } else if (numericHours >= 5 && numericHours <= 8) {
      return "moderate";
    } else if (numericHours >= 1 && numericHours <= 4) {
      return "low";
    } else {
      return "none";
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#F5ABD6", "#C4C1F2", "white"]}
        locations={[0, 0.22, 1]}
        style={styles.background}
      />
      <Header />
      <ScrollView style={styles.body}>
        <View style={styles.bodyBubble}>
          <Calendar
            markedDates={markedDates}
            markingType="custom"
            onDayPress={(day) => {
              fetchDayData(day.dateString);
            }}
            theme={styles.calendarTheme}
            style={styles.calendar}
          />
        </View>
        {selectedDate &&
          dayDetails &&
          dayDetails.map((item, index) => (
            <View style={styles.bodyBubble} key={index}>
              <View
                style={{
                  backgroundColor: quadrantColors[item.quadrant],
                  width: "100%",
                  padding: 15,
                  borderRadius: 33,
                  alignItems: "center",
                }}
              >
                <Text style={styles.heading}>{item.date}</Text>
                <Text style={styles.titleText}>
                  Entry {dayDetails.length - index}
                </Text>
              </View>
              <Text style={styles.detailText}>
                Sleep: {item.sleeping_hours} hours
              </Text>
              <Text style={styles.detailText}>
                Exercise: {getExerciseCategory(item.exercise_hours)}
              </Text>
              <Text style={styles.detailText}>
                Meals: {item.meals.join(", ")}
              </Text>
              <Text style={styles.detailText}>
                Activities: {item.activities.join(", ")}
              </Text>
              <Text style={styles.detailText}>
                Emotions: {item.emotions.join(", ")}
              </Text>
            </View>
          ))}
      </ScrollView>
    </View>
  );
}
