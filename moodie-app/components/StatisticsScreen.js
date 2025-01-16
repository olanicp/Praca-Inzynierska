import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { BarChart, PieChart } from "react-native-gifted-charts";
import Header from "./Header";
import { styles } from "./MainAppStyles";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const quadrantColors = {
  "high energy pleasant": "#83B2F1",
  "low energy pleasant": "#F5ABD0",
  "high energy unpleasant": "#A9DCC7",
  "low energy unpleasant": "#bfafe9",
};

const exerciseCategories = {
  intense: { range: [9, 10], color: "#83B2F1" },
  moderate: { range: [5, 8], color: "#F5ABD0" },
  low: { range: [1, 4], color: "#A9DCC7" },
  none: { range: [0, 0], color: "#bfafe9" },
};

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function getQuadrantChartData(quadrants) {
  const total = quadrants.length;
  const counts = {
    "high energy pleasant": 0,
    "low energy pleasant": 0,
    "high energy unpleasant": 0,
    "low energy unpleasant": 0,
  };

  quadrants.forEach((q) => {
    if (counts.hasOwnProperty(q)) {
      counts[q] += 1;
    }
  });

  const data = Object.entries(quadrantColors).map(([type, color]) => {
    const count = counts[type] || 0;
    const value = total > 0 ? (count / total) * 100 : 0;
    return { value, color };
  });

  return data;
}

function getExerciseDataForDay(dayStats) {
  const total = dayStats.length;
  const counts = {
    intense: 0,
    moderate: 0,
    low: 0,
    none: 0,
  };

  dayStats.forEach((stat) => {
    const hrs = stat.exerciseHours;
    if (
      hrs >= exerciseCategories.intense.range[0] &&
      hrs <= exerciseCategories.intense.range[1]
    ) {
      counts.intense += 1;
    } else if (
      hrs >= exerciseCategories.moderate.range[0] &&
      hrs <= exerciseCategories.moderate.range[1]
    ) {
      counts.moderate += 1;
    } else if (
      hrs >= exerciseCategories.low.range[0] &&
      hrs <= exerciseCategories.low.range[1]
    ) {
      counts.low += 1;
    } else if (
      hrs === exerciseCategories.none.range[0] &&
      hrs === exerciseCategories.none.range[1]
    ) {
      counts.none += 1;
    }
  });

  const data = Object.entries(exerciseCategories).map(
    ([category, { color }]) => {
      const count = counts[category] || 0;
      const value = total > 0 ? (count / total) * 100 : 0;
      return { value, color };
    }
  );

  return data;
}

export default function StatisticsScreen() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [stats, setStats] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchStatsData();
  }, []);

  const fetchStatsData = async () => {
    try {
      const userData = await AsyncStorage.getItem("userData");
      const userID = JSON.parse(userData).userId;
      const statsResponse = await axios.get(
        "https://backend-qat1.onrender.com/stats",
        {
          params: { userID },
        }
      );

      if (statsResponse.status === 200) {
        setStats(statsResponse.data.stats);
      }
    } catch (error) {
      console.error("Błąd żądania statystyk:", error);
      alert("Nie udało się pobrać statystyk. Spróbuj ponownie");
    }
  };

  const getStartAndEndOfDay = (date) => {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);
    return { start, end };
  };

  const getStartAndEndOfWeek = (date) => {
    const day = date.getDay();
    const diffToMonday = date.getDate() - day + (day === 0 ? -6 : 1);
    const start = new Date(date);
    start.setDate(diffToMonday);
    start.setHours(0, 0, 0, 0);

    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    end.setHours(23, 59, 59, 999);

    return { start, end };
  };

  const getStartAndEndOfYear = (date) => {
    const start = new Date(date.getFullYear(), 0, 1);
    start.setHours(0, 0, 0, 0);
    const end = new Date(date.getFullYear(), 11, 31);
    end.setHours(23, 59, 59, 999);
    return { start, end };
  };

  const { start: startOfDay, end: endOfDay } = getStartAndEndOfDay(currentDate);
  const { start: startOfWeek, end: endOfWeek } =
    getStartAndEndOfWeek(currentDate);
  const { start: startOfYear, end: endOfYear } =
    getStartAndEndOfYear(currentDate);

  const todayStats = stats.filter((stat) => {
    const statDate = new Date(stat.date);
    return statDate >= startOfDay && statDate <= endOfDay;
  });

  const weekStats = stats.filter((stat) => {
    const statDate = new Date(stat.date);
    return statDate >= startOfWeek && statDate <= endOfWeek;
  });

  const yearStats = stats.filter((stat) => {
    const statDate = new Date(stat.date);
    return statDate >= startOfYear && statDate <= endOfYear;
  });

  const getDailyQuadrantData = (dayStats) => {
    const total = dayStats.length;
    const counts = {
      "high energy pleasant": 0,
      "low energy pleasant": 0,
      "high energy unpleasant": 0,
      "low energy unpleasant": 0,
    };

    dayStats.forEach((stat) => {
      const q = stat.quadrant;
      if (counts.hasOwnProperty(q)) {
        counts[q] += 1;
      }
    });

    return Object.entries(quadrantColors).map(([type, color]) => {
      const count = counts[type] || 0;
      const value = total > 0 ? (count / total) * 100 : 0;
      return { value, color };
    });
  };

  const weekStackData = daysOfWeek.map((dayLabel, index) => {
    const adjustedDayIndex = index === 6 ? 0 : index + 1;
    const dayStats = weekStats.filter((stat) => {
      const statDate = new Date(stat.date);
      return statDate.getDay() === adjustedDayIndex;
    });

    const stacks = getDailyQuadrantData(dayStats);

    return {
      label: dayLabel,
      stacks,
    };
  });

  const todayQuadrants = todayStats.map((stat) => stat.quadrant);
  const todayChartData = getQuadrantChartData(todayQuadrants);

  const weekExerciseStackData = daysOfWeek.map((dayLabel, index) => {
    const adjustedDayIndex = index === 6 ? 0 : index + 1;
    const dayStats = weekStats.filter((stat) => {
      const statDate = new Date(stat.date);
      return statDate.getDay() === adjustedDayIndex;
    });

    const stacks = getExerciseDataForDay(dayStats);

    return {
      label: dayLabel,
      stacks,
    };
  });

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
          <Text style={styles.greetingText}>Your emotions</Text>
          <Text style={styles.questionText}>today</Text>
          <View style={styles.barChart}>
            <PieChart donut radius={150} data={todayChartData} />
          </View>
        </View>
        <View style={styles.bodyBubble}>
          <Text style={styles.greetingText}>Your emotions</Text>
          <Text style={styles.questionText}>this week</Text>
          <View style={styles.barChart}>
            <BarChart
              width={350}
              stackData={weekStackData}
              hideRules
              hideYAxisText
              yAxisThickness={0}
              xAxisThickness={0}
              barWidth={25}
              spacing={15}
              noOfSections={5}
              barBorderRadius={6}
            />
          </View>
        </View>
        <View style={styles.bodyBubble}>
          <Text style={styles.greetingText}>Your emotions and</Text>
          <Text style={styles.questionText}>physical activity</Text>
          <View style={styles.barChart}>
            <BarChart
              width={250}
              hideRules
              horizontal
              barWidth={25}
              spacing={15}
              noOfSections={5}
              hideYAxisText
              yAxisThickness={0}
              xAxisThickness={0}
              barBorderRadius={6}
              stackData={weekExerciseStackData}
            />
          </View>
        </View>
        <View style={styles.bodyBubble}></View>
        <View style={styles.bodyBubble}></View>
      </ScrollView>
    </View>
  );
}
