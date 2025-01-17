import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, FlatList } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BarChart, PieChart } from "react-native-gifted-charts";
import Header from "./Header";
import { styles } from "./MainAppStyles";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import EmotionBoxes from "./EmotionBoxes";

const quadrantColors = {
  "high energy pleasant": "#83B2F1",
  "low energy pleasant": "#F5ABD0",
  "high energy unpleasant": "#A9DCC7",
  "low energy unpleasant": "#bfafe9",
};

const exerciseCategories = {
  intense: { range: [9, 10] },
  moderate: { range: [5, 8] },
  low: { range: [1, 4] },
  none: { range: [0, 0] },
};

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const initializeQuadrantCounts = () => ({
  "high energy pleasant": 0,
  "low energy pleasant": 0,
  "high energy unpleasant": 0,
  "low energy unpleasant": 0,
});

const getExerciseCategory = (hours) => {
  const numericHours = parseFloat(hours);
  if (
    numericHours >= exerciseCategories.intense.range[0] &&
    numericHours <= exerciseCategories.intense.range[1]
  ) {
    return "intense";
  } else if (
    numericHours >= exerciseCategories.moderate.range[0] &&
    numericHours <= exerciseCategories.moderate.range[1]
  ) {
    return "moderate";
  } else if (
    numericHours >= exerciseCategories.low.range[0] &&
    numericHours <= exerciseCategories.low.range[1]
  ) {
    return "low";
  } else {
    return "none";
  }
};

function getQuadrantChartData(quadrants) {
  const total = quadrants.length;
  const counts = initializeQuadrantCounts();

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

const getDailyQuadrantData = (dayStats) => {
  const total = dayStats.length;
  const counts = initializeQuadrantCounts();

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

const getExerciseCategoryData = (stats) => {
  const data = {
    intense: { quadrants: {}, count: 0 },
    moderate: { quadrants: {}, count: 0 },
    low: { quadrants: {}, count: 0 },
    none: { quadrants: {}, count: 0 },
  };

  stats.forEach((stat) => {
    const category = getExerciseCategory(stat.exercise_hours);
    data[category].count += 1;

    if (!data[category].quadrants[stat.quadrant]) {
      data[category].quadrants[stat.quadrant] = 0;
    }
    data[category].quadrants[stat.quadrant] += 1;
  });

  return data;
};

const getStackedExerciseChartData = (exerciseData) => {
  return Object.entries(exerciseCategories).map(([category, { color }]) => {
    const categoryData = exerciseData[category];
    const total = categoryData.count;

    const quadrantStacks = Object.entries(quadrantColors).map(
      ([quadrant, quadrantColor]) => {
        const count = categoryData.quadrants[quadrant] || 0;
        const value = total > 0 ? (count / total) * 100 : 0;
        return { value, color: quadrantColor };
      }
    );

    return {
      label: category,
      stacks: quadrantStacks,
    };
  });
};

const getGroupedSleepDataWithQuadrants = (stats) => {
  const data = {
    "0-2": { quadrants: {}, count: 0 },
    "3-5": { quadrants: {}, count: 0 },
    "6-8": { quadrants: {}, count: 0 },
    "9-10+": { quadrants: {}, count: 0 },
  };

  stats.forEach((stat) => {
    const hours = stat.sleeping_hours;
    let group = "";

    if (hours >= 0 && hours <= 2) group = "0-2";
    else if (hours >= 3 && hours <= 5) group = "3-5";
    else if (hours >= 6 && hours <= 8) group = "6-8";
    else if (hours >= 9) group = "9-10+";

    if (group) {
      data[group].count += 1;

      if (!data[group].quadrants[stat.quadrant]) {
        data[group].quadrants[stat.quadrant] = 0;
      }
      data[group].quadrants[stat.quadrant] += 1;
    }
  });

  return data;
};

const getStackedSleepChartData = (groupedData) => {
  return Object.entries(groupedData).map(([group, data]) => {
    const total = data.count;

    const stacks = Object.entries(quadrantColors).map(([quadrant, color]) => {
      const count = data.quadrants[quadrant] || 0;
      const value = total > 0 ? (count / total) * 100 : 0;
      return { value, color };
    });

    return {
      label: group,
      stacks,
    };
  });
};

const getMealQuadrantStats = (stats) => {
  const data = {
    breakfast: { quadrants: {}, count: 0 },
    lunch: { quadrants: {}, count: 0 },
    brunch: { quadrants: {}, count: 0 },
    dinner: { quadrants: {}, count: 0 },
    snacks: { quadrants: {}, count: 0 },
    dessert: { quadrants: {}, count: 0 },
    alcohol: { quadrants: {}, count: 0 },
  };

  stats.forEach((stat) => {
    const meals = stat.meals;
    meals.forEach((meal) => {
      if (data[meal]) {
        data[meal].count += 1;

        if (!data[meal].quadrants[stat.quadrant]) {
          data[meal].quadrants[stat.quadrant] = 0;
        }

        data[meal].quadrants[stat.quadrant] += 1;
      }
    });
  });

  return data;
};

const getActivityQuadrantStats = (stats) => {
  const data = {
    work: { quadrants: {}, count: 0 },
    rest: { quadrants: {}, count: 0 },
    hobbies: { quadrants: {}, count: 0 },
    school: { quadrants: {}, count: 0 },
    TV: { quadrants: {}, count: 0 },
    errands: { quadrants: {}, count: 0 },
    "hanging out": { quadrants: {}, count: 0 },
  };

  stats.forEach((stat) => {
    const activities = stat.activities;

    activities.forEach((activity) => {
      if (data[activity]) {
        data[activity].count += 1;

        if (!data[activity].quadrants[stat.quadrant]) {
          data[activity].quadrants[stat.quadrant] = 0;
        }

        data[activity].quadrants[stat.quadrant] += 1;
      }
    });
  });

  return data;
};

const getMealChartData = (mealQuadrantStats) => {
  return Object.entries(mealQuadrantStats).map(([meal, data]) => {
    const total = data.count;

    const stacks = Object.entries(quadrantColors).map(([quadrant, color]) => {
      const count = data.quadrants[quadrant] || 0;
      const value = total > 0 ? (count / total) * 100 : 0;
      return { value, color };
    });

    return {
      label: meal.charAt(0).toUpperCase() + meal.slice(1),
      stacks,
    };
  });
};

const getActivityChartData = (activityQuadrantStats) => {
  return Object.entries(activityQuadrantStats).map(([activity, data]) => {
    const total = data.count;

    const stacks = Object.entries(quadrantColors).map(([quadrant, color]) => {
      const count = data.quadrants[quadrant] || 0;
      const value = total > 0 ? (count / total) * 100 : 0;
      return { value, color };
    });

    return {
      label: activity.charAt(0).toUpperCase() + activity.slice(1),
      stacks,
    };
  });
};

export default function StatisticsScreen({ navigation }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [stats, setStats] = useState([]);
  const [topFiveEmotions, setTopFiveEmotions] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchStatsData();
    });

    return unsubscribe;
  }, [navigation]);

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
        setTopFiveEmotions(statsResponse.data.emotionQuadrants);
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

  const { start: startOfDay, end: endOfDay } = getStartAndEndOfDay(currentDate);
  const { start: startOfWeek, end: endOfWeek } =
    getStartAndEndOfWeek(currentDate);

  const todayStats = stats.filter((stat) => {
    const statDate = new Date(stat.date);
    return statDate >= startOfDay && statDate <= endOfDay;
  });

  const weekStats = stats.filter((stat) => {
    const statDate = new Date(stat.date);
    return statDate >= startOfWeek && statDate <= endOfWeek;
  });

  const todayQuadrants = todayStats.map((stat) => stat.quadrant);
  const todayChartData = getQuadrantChartData(todayQuadrants);

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

  const exerciseCategoryData = getExerciseCategoryData(stats);
  const exerciseChartData = getStackedExerciseChartData(exerciseCategoryData);

  const groupedSleepData = getGroupedSleepDataWithQuadrants(stats);
  const sleepChartData = getStackedSleepChartData(groupedSleepData);

  const mealQuadrantStats = getMealQuadrantStats(stats);
  const mealChartData = getMealChartData(mealQuadrantStats);
  const activityQuadrantStats = getActivityQuadrantStats(stats);
  const activityChartData = getActivityChartData(activityQuadrantStats);

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
              width={300}
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
              width={300}
              stackData={exerciseChartData}
              hideRules
              hideYAxisText
              yAxisThickness={0}
              xAxisThickness={0}
              barWidth={25}
              spacing={40}
              noOfSections={5}
              barBorderRadius={6}
            />
          </View>
        </View>
        <View style={styles.bodyBubble}>
          <Text style={styles.greetingText}>Your emotions and</Text>
          <Text style={styles.questionText}>sleeping hours</Text>
          <View style={styles.barChart}>
            <BarChart
              width={300}
              stackData={sleepChartData}
              hideRules
              hideYAxisText
              yAxisThickness={0}
              xAxisThickness={0}
              barWidth={25}
              spacing={40}
              noOfSections={5}
              barBorderRadius={6}
            />
          </View>
        </View>
        <View style={styles.bodyBubble}>
          <Text style={styles.greetingText}>Meals and emotions</Text>
          <Text style={styles.questionText}>
            See how meals affected your emotions
          </Text>
          <View style={styles.barChart}>
            <BarChart
              width={300}
              stackData={mealChartData}
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
          <Text style={styles.greetingText}>Activities and emotions</Text>
          <Text style={styles.questionText}>
            See how activities affected your emotions
          </Text>
          <View style={styles.barChart}>
            <BarChart
              width={300}
              stackData={activityChartData}
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
          <Text style={styles.greetingText}>Your emotions</Text>
          <Text style={styles.questionText}>
            See your most frequently selected emotions
          </Text>
          <EmotionBoxes props={topFiveEmotions} />
        </View>
      </ScrollView>
    </View>
  );
}
