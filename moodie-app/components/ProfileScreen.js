import React from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { styles } from "./MainAppStyles";
import Header from "./Header";

export default function ProfileScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#F5ABD6", "#C4C1F2", "white"]}
        locations={[0, 0.22, 1]}
        style={styles.background}
      />
      <Header />
      <View style={styles.body}>
        <View style={styles.bodyBubble}></View>
        <View style={styles.bodyBubble}></View>
        <View style={styles.bodyBubble}></View>
        <View style={styles.bodyBubble}></View>
        <View style={styles.bodyBubble}></View>
      </View>
    </View>
  );
}
