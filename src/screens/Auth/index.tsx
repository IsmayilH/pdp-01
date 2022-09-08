import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {
  TextInput,
  Button,
  Text,
  Dialog,
  Portal,
  Paragraph,
} from 'react-native-paper';
import auth from '@react-native-firebase/auth';

const Auth = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordRepeat, setPasswordRepeat] = useState<string>('');
  const [dialogVisible, setDialogVisible] = useState<boolean>(false);
  const [dialogMessage, setDialoMessage] = useState<string>('');

  const hideDialog = () => {
    setDialogVisible(false);
  };

  const registerNewUser = () => {
    if (password !== passwordRepeat) {
      setDialoMessage("Password doesn't match");
      setDialogVisible(true);
      setEmail('');
      setPassword('');
      setPasswordRepeat('');
      return;
    }
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
          setEmail('');
          setPassword('');
          setPasswordRepeat('');
          setDialoMessage('That email address is already in use!');
          setDialogVisible(true);
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
          setEmail('');
          setPassword('');
          setPasswordRepeat('');
          setDialoMessage('That email address is invalid!');
          setDialogVisible(true);
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
        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
          setEmail('');
          setPassword('');
          setDialoMessage('That email address is invalid!');
          setDialogVisible(true);
        }
        if (error.code === 'auth/wrong-password') {
          console.log('That password is incorrect!');
          setPassword('');
          setDialoMessage('Password is incorrect!');
          setDialogVisible(true);
        }
      });
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Text style={{fontSize: 24, fontWeight: '700'}}>
          {!isLogin ? 'Registration' : 'Login'}
        </Text>
        <View style={styles.formContainer}>
          <TextInput
            value={email}
            onChangeText={text => setEmail(text)}
            label="Email"
            mode="outlined"
            style={styles.input}
            keyboardType="email-address"
          />
          <TextInput
            value={password}
            onChangeText={text => setPassword(text)}
            label="Password"
            mode="outlined"
            style={styles.input}
            secureTextEntry={true}
          />
          {!isLogin && (
            <TextInput
              value={passwordRepeat}
              onChangeText={text => setPasswordRepeat(text)}
              label="Password Repeat"
              mode="outlined"
              style={styles.input}
              secureTextEntry={true}
            />
          )}
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
            <Text>Already have an account ?</Text>
          )}

          <Button onPress={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Register' : 'Login'}
          </Button>
        </View>
      </SafeAreaView>

      <Portal>
        <Dialog visible={dialogVisible} onDismiss={hideDialog}>
          <Dialog.Title>Error</Dialog.Title>
          <Dialog.Content>
            <Paragraph>{dialogMessage}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
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
