import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { Calendar } from "react-native-calendars";
import { styles } from "./MainAppStyles";
import Header from "./Header";
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

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={["#F5ABD6", "#C4C1F2", "white"]}
        locations={[0, 0.22, 1]}
        style={styles.background}
      />
      <Header />
      <View style={styles.body}>
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
          dayDetails.map((item, index) => (
            <View style={styles.bodyBubble} key={index}>
              <Text style={styles.heading}>Interview {index + 1}</Text>
              <Text style={styles.titleText}>Date: {item.date}</Text>
              <Text style={styles.detailText}>
                Sleeping Hours: {item.sleeping_hours}
              </Text>
              <Text style={styles.detailText}>
                Exercise Hours: {item.exercise_hours}
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
      </View>
    </ScrollView>
  );
}

// https://www.npmjs.com/package/react-native-calendars/v/1.1286.0
