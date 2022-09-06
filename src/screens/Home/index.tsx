import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-paper';
import auth from '@react-native-firebase/auth';

const HomeScreen = () => {
  const logoutUser = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };
  return (
    <View style={styles.container}>
      <Text testID="home" style={styles.title}>
        Home screen
      </Text>
      <Button
        style={styles.button}
        icon="camera"
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
