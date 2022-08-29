import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {TextInput, Button} from 'react-native-paper';

const Auth = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  return (
    <SafeAreaView style={styles.container}>
      <Text>{!isLogin ? 'Registration' : 'Login'}</Text>
      <View style={styles.formContainer}>
        <TextInput
          onChangeText={text => setEmail(text)}
          label="Email"
          mode="outlined"
          style={styles.input}
          keyboardType="email-address"
        />
        <TextInput
          onChangeText={text => setPassword(text)}
          label="Password"
          mode="outlined"
          style={styles.input}
          secureTextEntry={true}
        />
        <Button mode="contained" onPress={() => console.log('Pressed')}>
          Press me
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  formContainer: {
    flex: 1,
    width: '100%',
    marginBottom: 50,
  },
  input: {
    marginVertical: 10,
  },
});

export default Auth;
