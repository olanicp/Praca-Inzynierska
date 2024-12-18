import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Calendar } from "react-native-calendars";
import { styles } from "./MainAppStyles";

// // Assume moodData is fetched from your database or API
// const getMoodData = async () => {
//   // Fetch mood data from database (for the last month, for example)
//   const response = await fetch('https://your-api.com/getMoodData');
//   const data = await response.json();
//   return data;
// };

export default function CalendarScreen() {
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState(null);

  // const [moodData, setMoodData] = useState([]);

  // useEffect(() => {
  //   getMoodData().then((data) => {
  //     setMoodData(data);
  //   });
  // }, []);

  // const formatMoodData = (data) => {
  //   const moodDataObject = {};
  //   data.forEach((entry) => {
  //     const date = entry.date; // format: '2024-11-20'
  //     const mood = entry.mood; // e.g., 'happy', 'sad', 'anxious'

  //     // Assign a color for the mood
  //     const color =
  //       mood === "happy" ? "green" : mood === "sad" ? "red" : "blue";

  //     moodDataObject[date] = {
  //       customStyles: {
  //         container: {
  //           backgroundColor: color,
  //           borderRadius: 10,
  //         },
  //       },
  //     };
  //   });
  //   return moodDataObject;
  // };

  const dayDetails = {
    "2024-12-08": {
      frequency: 0.7,
      intensity: 0.3,
      emotions: ["calm", "content"],
      description: "It was a great day!",
    },
    "2024-12-16": {
      frequency: 0.3,
      intensity: 0.5,
      emotions: ["worried", "stressed"],
      description: "A challenging day, but I managed to push through.",
    },
  };

  // const markedDates = formatMoodData(moodData);
  const markedDates = {
    "2024-12-08": {
      customStyles: {
        container: {
          backgroundColor: "#F5ABD6",
        },
      },
    },
    "2024-12-16": {
      customStyles: {
        container: {
          backgroundColor: "#83B2F1",
          elevation: 2,
        },
      },
    },
  };
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#F5ABD6", "#C4C1F2", "white"]}
        locations={[0, 0.22, 1]}
        style={styles.background}
      />
      <View style={styles.header}>
        <View style={styles.headerBubble}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>E</Text>
          </View>
        </View>
        <View style={styles.dateAndStreak}>
          <View style={styles.headerBubble}>
            <Text style={styles.dateText}>Sat, Dec 7</Text>
          </View>
          <View style={styles.headerBubble}>
            <FontAwesome6
              name="fire-flame-curved"
              size={24}
              color="#474146"
              style={{ paddingHorizontal: 5 }}
            />
            <Text
              style={{
                fontFamily: "Quicksand-Regular",
                fontSize: 16,
                color: "#474146",
                paddingHorizontal: 5,
              }}
            >
              6
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.body}>
        <View style={styles.bodyBubble}>
          <Calendar
            markedDates={markedDates}
            markingType="custom"
            onDayPress={(day) => {
              setSelectedDate(day.dateString);
            }}
            theme={styles.calendarTheme}
            style={styles.calendar}
          />
        </View>
        {selectedDate && dayDetails[selectedDate] && (
          <View style={styles.bodyBubble}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                alignItems: "center",
              }}
            >
              <View style={{ paddingHorizontal: 20 }}>
                <Text style={styles.titleText}>Emotions:</Text>
                <Text style={styles.detailText}>
                  {dayDetails[selectedDate].emotions.join(", ")}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("DayDetailsScreen", {
                    date: selectedDate,
                    details: dayDetails[selectedDate],
                  })
                }
                style={{ paddingHorizontal: 20 }}
              >
                <AntDesign name="rightcircle" size={48} color="#F5ABD6" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

// https://www.npmjs.com/package/react-native-calendars/v/1.1286.0
