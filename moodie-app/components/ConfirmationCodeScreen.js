import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import GradientButton from "./GradientButton";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import axios from "axios";
import { sortRoutesWithInitial } from "expo-router/build/sortRoutes";
import { styles } from "./CredentialScreenStyles";
export default function ConfirmationCodeScreen() {
  const navigation = useNavigation();
  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: 4 });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const onSubmitPressed = async (event) => {
    try {
      const response = await axios.post(
        "http://192.168.43.115:5000/confirmation-code",
        {
          code: code.value,
        }
      );

      if (response.status === 200) {
        alert("Dane przesłane");
        navigation.navigate("ResetPassword");
      } else {
        throw new Error("error has occurred");
      }
    } catch (error) {
      alert(error.response.data);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={styles.backgroundGradient}
        style={styles.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <View style={styles.header}>
        <Text style={styles.title}>Enter verification code</Text>
        <Text style={styles.caption}>
          A 4-digit verification code was just sent to your email inbox. Enter
          it below.
        </Text>
      </View>

      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={4}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}
          >
            {symbol || (isFocused ? <Cursor /> : <Text>?</Text>)}
          </Text>
        )}
      />
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate("ResetPassword")}
          style={{
            borderColor: "#474146",
            borderRadius: 50,
            borderWidth: 1,
            margin: 15,
          }}
        >
          <GradientButton text="next"></GradientButton>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("ConfirmationCode")}
        >
          <Text style={styles.clickableText}>
            Didn’t receive a code? Click here to resend it
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
