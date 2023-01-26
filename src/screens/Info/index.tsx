import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Info from '../../components/Info/Info';

const InfoScreen = () => {
  return (
    <View style={styles.container}>
      <Info />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default InfoScreen;
