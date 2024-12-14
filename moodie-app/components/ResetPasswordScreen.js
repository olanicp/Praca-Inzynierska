import { View, Text, StyleSheet, TextInput } from 'react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })

  return (
    <View style={styles.container}>
      <TextInput 
        label="email"
        value={email.value}
        onChangeText={(text) => setEmail({value: text, error: ""})}
      />

      <TextInput 
        label="password"
        value={password.value}
        onChangeText={(text) => setPassword({value: text, error: ""})}
        secureTextEntry
      />

      <TouchableOpacity
        onPress={() => navigation.navigate('ResetPasswordScreen')}
      >
        <Text style={styles.forgot}>Forgot your password?</Text>
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