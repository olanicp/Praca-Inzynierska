import React from "react";
import { View, Text, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { BarChart, PieChart } from "react-native-gifted-charts";
import Header from "./Header";
import { styles } from "./MainAppStyles";

export default function StatisticsScreen() {
  const navigation = useNavigation();

  const todayData = [
    { value: 2, color: "#83B2F1" },
    { value: 1, color: "#F5ABD6" },
    { value: 1, color: "#A9DCC7" },
  ];

  const weekData = [
    {
      stacks: [
        { value: 1, color: "#F5ABD6" },
        { value: 2, color: "#83B2F1", marginBottom: 2 },
      ],
      label: "Mon",
    },
    {
      stacks: [
        { value: 2, color: "#83B2F1" },
        { value: 1, color: "#F5ABD6", marginBottom: 2 },
        { value: 1, color: "#A9DCC7", marginBottom: 2 },
      ],
      label: "Tue",
    },
    {
      stacks: [{ value: 1, color: "#F5ABD6" }],
      label: "Wed",
    },
    {
      stacks: [
        { value: 2, color: "#83B2F1" },
        { value: 1, color: "#F5ABD6", marginBottom: 2 },
        { value: 2, color: "#A9DCC7", marginBottom: 2 },
      ],
      label: "Thu",
    },
    {
      stacks: [{}],
      label: "Fri",
    },
    {
      stacks: [{}],
      label: "Sat",
    },
    {
      stacks: [{}],
      label: "Sun",
    },
  ];

  const physicalActivityData = [
    {
      stacks: [
        { value: 11, color: "#A9DCC7" },
        { value: 2, color: "#F5ABD6", marginBottom: 2 },
      ],
      label: "intense",
    },
    { stacks: [{ value: 13, color: "#A9DCC7" }], label: "moderate" },
    {
      stacks: [
        { value: 8, color: "#A9DCC7" },
        { value: 2, color: "#83B2F1" },
      ],
      label: "light",
    },
    {
      stacks: [
        { value: 2, color: "#A9DCC7" },
        { value: 4, color: "#83B2F1" },
      ],
      label: "none",
    },
  ];

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
            <PieChart donut radius={150} data={todayData} />
          </View>
        </View>
        <View style={styles.bodyBubble}>
          <Text style={styles.greetingText}>Your emotions</Text>
          <Text style={styles.questionText}>this week</Text>
          <View style={styles.barChart}>
            <BarChart
              width={240}
              maxValue={5}
              hideRules
              hideYAxisText
              yAxisThickness={0}
              xAxisThickness={0}
              barWidth={25}
              spacing={15}
              noOfSections={5}
              barBorderRadius={6}
              stackData={weekData}
            />
          </View>
        </View>
        <View style={styles.bodyBubble}>
          <Text style={styles.greetingText}>Your emotions and</Text>
          <Text style={styles.questionText}>physical activity</Text>
          <View style={styles.barChart}>
            <BarChart
              maxValue={15}
              hideRules
              horizontal
              barWidth={25}
              spacing={15}
              noOfSections={5}
              hideYAxisText
              yAxisThickness={0}
              xAxisThickness={0}
              barBorderRadius={6}
              stackData={physicalActivityData}
            />
          </View>
        </View>
        <View style={styles.bodyBubble}></View>
        <View style={styles.bodyBubble}></View>
      </ScrollView>
    </View>
  );
}
