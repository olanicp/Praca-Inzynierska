import React, { useEffect, useState } from "react";
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
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const navigation = useNavigation();

  const handleLogOut = async () => {
    try {
      const userData = await AsyncStorage.getItem("userData");
      const userID = JSON.parse(userData).userId;

      const response = !isAnonymous
        ? await axios.post("https://backend-qat1.onrender.com/logout")
        : await axios.post("https://backend-qat1.onrender.com/delete-account", {
            userID,
          });

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

  useEffect(() => {
    const fetchIsAnonymous = async () => {
      const userData = await AsyncStorage.getItem("userData");
      const parsedData = JSON.parse(userData);
      setName(parsedData.name);
      setEmail(parsedData.email);
      setIsAnonymous(parsedData.isAnonymous);
    };

    fetchIsAnonymous();
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#F5ABD6", "#C4C1F2", "white"]}
        locations={[0, 0.22, 1]}
        style={styles.background}
      />
      <Header />
      {!isAnonymous ? (
        <ScrollView style={styles.body}>
          <View style={styles.bodyBubble}>
            <Text style={styles.questionText}>Account details</Text>
            <Text style={styles.detailText}>Name: {name}</Text>
            <Text style={styles.detailText}>Email address: {email}</Text>
          </View>
          <View style={styles.bodyBubble}>
            <View style={styles.seeMoreButton}>
              <View style={{ paddingHorizontal: 15 }}>
                <Text style={styles.titleText}>Change name</Text>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate("ChangeNameScreen", {})}
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
                onPress={() => navigation.navigate("ChangeEmailScreen", {})}
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
                onPress={() =>
                  navigation.navigate("ResetPasswordWhenLoggedScreen", {})
                }
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
      ) : (
        <ScrollView style={styles.body}>
          <View style={styles.bodyBubble}>
            <Text style={styles.questionText}>Account details</Text>
            <Text style={[styles.detailText, { alignSelf: "center" }]}>
              You're logged in as a guest.
            </Text>
            <Text
              style={[
                styles.detailText,
                { alignSelf: "center", fontFamily: "Quicksand-Bold" },
              ]}
            >
              Link an account to backup your data.
            </Text>
          </View>
          <View style={styles.bodyBubble}>
            <View style={styles.seeMoreButton}>
              <View style={{ paddingHorizontal: 15 }}>
                <Text style={styles.titleText}>Link account</Text>
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
          <Text style={[styles.detailText, { textAlign: "center" }]}>
            Logging out without a linked account will delete all of your data!
          </Text>
        </ScrollView>
      )}
    </View>
  );
}
