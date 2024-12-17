import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Calendar } from "react-native-calendars";
import GradientButton from "./GradientButton";

// // Assume moodData is fetched from your database or API
// const getMoodData = async () => {
//   // Fetch mood data from database (for the last month, for example)
//   const response = await fetch('https://your-api.com/getMoodData');
//   const data = await response.json();
//   return data;
// };

export default function CalendarScreen() {
  const navigation = useNavigation();
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
            // Initially marked dates (fetched data)
            markedDates={markedDates}
            markingType="custom" // Use custom styling for each date
            // onDayPress={(day) => {
            //   // Show detailed data when user clicks on a day
            //   console.log("Selected day", day);
            // }}
            theme={styles.calendarTheme}
            style={styles.calendar}
          />
        </View>
      </View>

      <LinearGradient
        colors={["#A9C7EF", "#C6DCF9", "#F5ABD6"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.navbar}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("Main")}
          style={styles.navItem}
        >
          <AntDesign name="home" size={28} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Calendar")}
          style={styles.navItem}
        >
          <AntDesign name="calendar" size={28} color="white" />
        </TouchableOpacity>
        <LinearGradient
          colors={["#A9C7EF", "#C6DCF9", "#F5ABD6"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.linearGradient}
        >
          <TouchableOpacity style={styles.addButton}>
            <AntDesign name="plus" size={42} color="#868185" />
          </TouchableOpacity>
        </LinearGradient>
        <TouchableOpacity style={styles.navItem}>
          <AntDesign name="barschart" size={28} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <AntDesign name="user" size={28} color="white" />
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "900",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 50,
    backgroundColor: "#FFF6FB",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontFamily: "Quicksand-Regular",
    fontSize: 16,
    color: "#474146",
  },
  dateAndStreak: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  dateText: {
    fontSize: 16,
    color: "#474146",
    marginHorizontal: 5,
  },
  headerBubble: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#FFF6FB",
    opacity: 0.75,
    borderRadius: 50,
    padding: 10,
    marginHorizontal: 5,
  },
  body: {
    justifyContent: "space-between",
    flex: 1,
    marginBottom: 100,
  },
  bodyBubble: {
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#FFF6FB",
    height: 400,
    opacity: 0.75,
    borderRadius: 50,
    paddingHorizontal: 15,
    paddingVertical: 30,
    marginVertical: 5,
  },
  greetingText: {
    fontFamily: "Quicksand-Regular",
    fontSize: 24,
    color: "black",
  },
  questionText: {
    fontFamily: "PlayfairDisplay-Regular",
    fontSize: 32,
    color: "black",
    letterSpacing: -1,
    textAlign: "center",
    marginBottom: 20,
  },
  actionButton: {
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  actionButtonText: {
    fontSize: 18,
    color: "#4474146",
  },
  inputSection: {
    marginTop: 20,
  },
  inputLabel: {
    fontFamily: "Quicksand-Regular",
    fontSize: 18,
    color: "#666",
    marginBottom: 10,
  },
  textInput: {
    fontFamily: "Quicksand-Regular",
    borderWidth: 1,
    borderColor: "#474146",
    borderRadius: 33,
    padding: 20,
    fontSize: 16,
    opacity: 0.75,
    color: "#474146",
    backgroundColor: "#F6FFFE",
    textAlignVertical: "top",
    minHeight: 150,
  },
  navbar: {
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 65,
    borderRadius: 50,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    margin: 10,
  },
  navItem: {
    alignItems: "center",
  },
  navIcon: {
    fontSize: 24,
    color: "#AAA",
  },
  addButton: {
    width: 75,
    height: 75,
    borderRadius: 50,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  linearGradient: {
    height: 80,
    width: 80,
    borderRadius: 50,
    marginBottom: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonText: {
    fontSize: 30,
    color: "#474146",
  },
  calendar: {
    backgroundColor: "transparent",
    color: "transparent",
    height: 350,
    width: 320,
  },
  calendarTheme: {
    backgroundColor: "transparent",
    calendarBackground: "transparent",
    selectedDayBackgroundColor: "#00adf5",
    todayTextColor: "#00adf5",
    arrowColor: "#474146",
    monthTextColor: "#474146",
    textDayFontFamily: "Quicksand-Regular",
    textMonthFontFamily: "Quicksand-Regular",
    textDayHeaderFontFamily: "Quicksand-Regular",
    textDayFontSize: 16,
    textMonthFontSize: 24,
    textDayHeaderFontSize: 16,
  },
});

// https://www.npmjs.com/package/react-native-calendars/v/1.1286.0
