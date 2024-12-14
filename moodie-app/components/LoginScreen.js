import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })

  const onLoginPressed = async (event) => {
    try {
      const response = await axios.post('http://192.168.43.115:5000/login', {
        email: email.value,
        password: password.value,
      });

      if (response.status === 200){
        alert("Dane przesłane");
        navigation.navigate("Main")

      }else{
        throw new Error("error has occurred");
      }
    }catch(error){
      alert(error.response.data);
    }
  }

  // useEffect(() => {
  //   onLoginPressed()
  // }, []);


  

  return (
    <View style={styles.container}>
      <TextInput 
        label="email"
        placeholder="email"
        value={email.value}
        onChangeText={(text) => setEmail({value: text, error: ""})}
      />

      <TextInput 
        label="password"
        placeholder="password"
        value={password.value}
        onChangeText={(text) => setPassword({value: text, error: ""})}
        secureTextEntry
      />

      <TouchableOpacity
        onPress={() => navigation.navigate('ResetPasswordScreen')}
      >
        <Text style={styles.forgot}>Forgot your password?</Text>
      </TouchableOpacity>

      <Button
        onPress={onLoginPressed}
        title="Login"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});