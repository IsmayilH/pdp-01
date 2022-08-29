/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import RootNavigator from './src/navigation';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    secondary: 'yellow',
  },
};

const App = () => {
  return (
    <NavigationContainer>
      <PaperProvider theme={theme}>
        <RootNavigator />
      </PaperProvider>
    </NavigationContainer>
  );
};

export default App;
