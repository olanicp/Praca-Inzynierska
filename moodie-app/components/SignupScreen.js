import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

function emailValidator(email) {
  const re = /\S+@\S+\.\S+/
  if (!email) return "Email can't be empty."
  if (!re.test(email)) return 'Ooops! We need a valid email address.'
  return ''
}

function nameValidator(name) {
  if (!name) return "Name can't be empty."
  return ''
}

function passwordValidator(password) {
  if (!password) return "Password can't be empty."
  if (password.length < 5) return 'Password must be at least 5 characters long.'
  return ''
}


export default function SignupScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState({ value: '', error: '' })
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })

  const onSignUpPressed = async (event) => {
    const nameError = nameValidator(name.value)
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError })
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return;
    }

    try {
      const response = await axios.post('http://192.168.43.115:5000/signup', {
        name: name.value,
        email: email.value,
        password: password.value,
      });

      if (response.status === 200){
        alert("Dane przesłane");
        navigation.navigate("Login")

      }else{
        throw new Error("error has occurred");
      }
    }catch(error){
      alert(error.response.data);
    }
  }

  return (
    <View style={styles.container}>
      <TextInput 
        label="name"
        placeholder="name"
        value={name.value}
        onChangeText={(text) => setName({value: text, error: ""})}
      />
      {Boolean(name.error) && <Text style={{ color: 'red' }}>{name.error}</Text>}

      <TextInput 
        label="email"
        placeholder="email"
        value={email.value}
        onChangeText={(text) => setEmail({value: text, error: ""})}
      />
      {Boolean(email.error) && <Text style={{ color: 'red' }}>{email.error}</Text>}

      <TextInput 
        label="password"
        placeholder="password"
        value={password.value}
        onChangeText={(text) => setPassword({value: text, error: ""})}
        secureTextEntry
      />
      {Boolean(password.error) && <Text style={{ color: 'red' }}>{password.error}</Text>}

      <TouchableOpacity
        onPress={() => navigation.navigate('ResetPasswordScreen')}
      >
        <Text style={styles.forgot}>Forgot your password?</Text>
      </TouchableOpacity>

      <Button
        onPress={onSignUpPressed}
        title="Signup"
      />

    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgb(255, 0, 255)'
    },
});