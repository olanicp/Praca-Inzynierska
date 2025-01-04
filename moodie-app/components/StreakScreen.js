import React, { useState,useEffect  } from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import AntDesign from '@expo/vector-icons/AntDesign';
import AsyncStorage from "@react-native-async-storage/async-storage";

const getStreakData = async () => {
  try {
    const streak = await AsyncStorage.getItem('streak');
    const loginDays = await AsyncStorage.getItem('loginDays');
    if (streak && loginDays) {
      console.log('Streak from storage:', streak);
      console.log('Login days from storage:', loginDays);

      return {
        streak: streak ? JSON.parse(streak) : 0,
        loginDays: loginDays ? JSON.parse(loginDays) : []
      };
    }
    return null;
  } catch (error) {
    console.error('Error retrieving streak:', error);
    return null;
  }
};


export default function StreakScreen({ navigation }) {
    const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    const [streak, setStreak] = useState(0);
    const [checkedDays, setCheckedDays] = useState([]);
    
    useEffect(() => {
      const fetchStreakData = async () => {
        const streakData = await getStreakData();
        setStreak(streakData.streak);
        setCheckedDays(streakData.loginDays);
      };
    
      fetchStreakData();
    }, []);

    const getDaysInOrder = () => {
      const firstDayIndex = checkedDays.length > 0 ? checkedDays[0] : 0; // Dzień początkowy streak
      const orderedDays = [];
      for (let i = 0; i < 7; i++) {
        orderedDays.push(days[(firstDayIndex + i) % 7]);
      }
      return orderedDays;
    };
  
    return (
        <View style={styles.container}>
        <LinearGradient
          colors={["#e480bb", "#ffffff", "#e480bb"]}
          locations={[0, 0.5, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.background}
        />

        <View style={styles.subContainer}>
          <Text style={styles.streakNumber}>{streak}</Text>
          <Text style={styles.streakText}>day streak!</Text>
          <Text style={styles.infoText}>Check in everyday to keep it going</Text>
      
          <View style={styles.daysContainer}>
            {getDaysInOrder().map((day, index) => (
              <View key={index} style={styles.dayWrapper}>
                <Text style={styles.dayText}>{day}</Text>
                <View
                  style={[
                    styles.circle,
                    checkedDays.includes((checkedDays[0] + index) % 7)
                     ? styles.checkedCircle 
                     : styles.uncheckedCircle,
                  ]}
                >
                  {checkedDays.includes((checkedDays[0] + index) % 7) && <AntDesign name="check" size={24} color="#474146" />}
                </View>
              </View>
            ))}
          </View>
        </View>
      
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>close</Text>
        </TouchableOpacity>
      </View>
      
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-between', 
    },
    background: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
    subContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    streakNumber: {
      fontFamily: "PlayfairDisplay-Bold",
      fontSize: 90,
      color: '#333',
      marginBottom: 10,
    },
    streakText: {
      fontFamily: "Quicksand-Bold",
      fontSize: 40,
      color: '#333',
      marginBottom: 10,
    },
    infoText: {
      fontFamily: "Quicksand-Regular",
      fontSize: 18,
      color: '#666',
      marginBottom: 30,
    },
    daysContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '80%',
      alignItems: 'center',
    },
    dayWrapper: {
      alignItems: 'center',
    },
    circle: {
      width: 40,
      height: 40,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: 'black',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 5,
      marginHorizontal: 5,
    },
    checkedCircle: {
      backgroundColor: '#f5abd6',
    },
    uncheckedCircle: {
      backgroundColor: '#fff6fb',
    },
    dayText: {
      fontSize: 14,
      fontFamily: "Quicksand-Regular",
      color: "#474146",
      marginVertical: 10,
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 50,
      backgroundColor: 'white',
      borderWidth: 1,
      height: 65,
      width: 300,
      marginBottom: 40, 
    },
    buttonText: {
      fontFamily: "Quicksand-Regular",
      fontSize: 20,
      color: "#474146",
    },
  });
  