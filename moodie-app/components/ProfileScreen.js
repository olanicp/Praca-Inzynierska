import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import GradientButton from "./GradientButton";
import { styles } from "./MainAppStyles";
import AntDesign from "@expo/vector-icons/AntDesign";
import Header from "./Header";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProfileScreen() {
  const navigation = useNavigation();

  const handleLogOut = async () => {
    try {
      const response = await axios.post(
        "https://backend-qat1.onrender.com/logout"
      );

      if (response.status === 200) {
        await AsyncStorage.removeItem("userData");
        navigation.navigate("Welcome");
      } else {
        console.log("error");
      }
    } catch (error) {
      console.error("Error logging out", error);
    }
  };

  const getUserEmail = async () => {
    try {
      const userData = await AsyncStorage.getItem("userData");
      return JSON.parse(userData).email;
    } catch (error) {
      console.error("Error fetching email:", error);
    }
  };

  const getName = async () => {
    try {
      const userData = await AsyncStorage.getItem("userData");
      return JSON.parse(userData).name;
    } catch (error) {
      console.error("Error fetching name:", error);
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
          <Text style={styles.questionText}>Account details</Text>
          <Text style={styles.detailText}>Name: {getName()}</Text>
          <Text style={styles.detailText}>Email address: {getUserEmail()}</Text>
        </View>
        <View style={styles.bodyBubble}>
          <View style={styles.seeMoreButton}>
            <View style={{ paddingHorizontal: 15 }}>
              <Text style={styles.titleText}>Change name</Text>
            </View>
            <TouchableOpacity
              // onPress={() =>
              //   navigation.navigate("ChangeEmail", {
              //   })
              // }
              style={{ paddingHorizontal: 20 }}
            >
              <AntDesign name="rightcircle" size={48} color="#F5ABD6" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.bodyBubble}>
          <View style={styles.seeMoreButton}>
            <View style={{ paddingHorizontal: 15 }}>
              <Text style={styles.titleText}>Change email</Text>
            </View>
            <TouchableOpacity
              // onPress={() =>
              //   navigation.navigate("ChangeEmail", {
              //   })
              // }
              style={{ paddingHorizontal: 20 }}
            >
              <AntDesign name="rightcircle" size={48} color="#F5ABD6" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.bodyBubble}>
          <View style={styles.seeMoreButton}>
            <View style={{ paddingHorizontal: 15 }}>
              <Text style={styles.titleText}>Change password</Text>
            </View>
            <TouchableOpacity
              // onPress={() =>
              //   navigation.navigate("ChangeEmail", {
              //   })
              // }
              style={{ paddingHorizontal: 20 }}
            >
              <AntDesign name="rightcircle" size={48} color="#F5ABD6" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.bodyBubble}>
          <View style={styles.seeMoreButton}>
            <View style={{ paddingHorizontal: 15 }}>
              <Text style={styles.titleText}>Delete account</Text>
            </View>
            <TouchableOpacity
              // onPress={() =>
              //   navigation.navigate("ChangeEmail", {
              //   })
              // }
              style={{ paddingHorizontal: 20 }}
            >
              <AntDesign name="rightcircle" size={48} color="#F5ABD6" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.bodyBubble}></View>
        <TouchableOpacity
          onPress={handleLogOut}
          style={{
            borderColor: "#474146",
            borderRadius: 50,
            borderWidth: 1,
            margin: 15,
            alignSelf: "center",
            bottom: 0,
          }}
        >
          <GradientButton text={"log out"} />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
