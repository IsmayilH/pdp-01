import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import Home from '../../components/Home';

const HomeScreen = () => {
  const logoutUser = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };
  return (
    <View testID="home" style={styles.container}>
      <Text style={styles.title}>Home screen</Text>
      <Home />
      <Button
        testID="logout-button"
        style={styles.button}
        mode="contained"
        onPress={logoutUser}>
        Logout
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
  },
  button: {
    marginVertical: 20,
  },
});

export default HomeScreen;
