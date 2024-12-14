import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function WelcomeScreen() {
  const navigation = useNavigation()
  const goToLoginScreen = () => {
    navigation.navigate('Login');
  }

  const goToSignupScreen = () => {
    navigation.navigate('Signup');
  }

  const loginAsGuest = () => {
    navigation.navigate('Main');
  }
  return (
    <View style={styles.container}>
      <Text>moodie</Text>
      <Text>your personal self reflection assistant</Text>

      <TouchableOpacity onPress={goToLoginScreen}>
        <Text>log in</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={goToSignupScreen}>
        <Text>sign up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={loginAsGuest}>
        <Text>enter as guest</Text>
      </TouchableOpacity>
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