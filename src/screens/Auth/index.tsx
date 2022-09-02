import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {TextInput, Button, Text} from 'react-native-paper';
import auth from '@react-native-firebase/auth';

const Auth = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const registerNewUser = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  };

  const loginUser = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User signed in successfully');
      })
      .catch(error => {
        console.error('error', error);
      });
  };

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
        {isLogin ? (
          <Button mode="contained" onPress={loginUser}>
            Login
          </Button>
        ) : (
          <Button mode="contained" onPress={registerNewUser}>
            Register
          </Button>
        )}
      </View>
      <View style={styles.footer}>
        {isLogin ? (
          <Text>Don't have an account? </Text>
        ) : (
          <Text>Alreaty have an account ?</Text>
        )}

        <Button onPress={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Register' : 'Login'}
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
  footer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Auth;
