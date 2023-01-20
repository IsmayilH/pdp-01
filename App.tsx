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
import React, {useEffect, useRef} from 'react';
import analytics from '@react-native-firebase/analytics';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
// import {Alert} from 'react-native';
// import messaging from '@react-native-firebase/messaging';
import RootNavigator from './src/navigation';
import {NotificationProvider} from './src/context/NotificationContext';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    secondary: 'yellow',
  },
};

const App = () => {
  const routeNameRef = useRef();
  const navigationRef = useRef();

  return (
    <>
      <NotificationProvider>
        <NavigationContainer
          ref={navigationRef}
          onReady={() => {
            routeNameRef.current = navigationRef.current.getCurrentRoute().name;
          }}
          onStateChange={async () => {
            const previousRouteName = routeNameRef.current;
            const currentRouteName =
              navigationRef.current.getCurrentRoute().name;

            if (previousRouteName !== currentRouteName) {
              console.log('currentRouteName', currentRouteName);
              await analytics().logScreenView({
                screen_name: currentRouteName,
                screen_class: currentRouteName,
              });
            }
            routeNameRef.current = currentRouteName;
          }}>
          <PaperProvider theme={theme}>
            <RootNavigator />
          </PaperProvider>
        </NavigationContainer>
      </NotificationProvider>
    </>
  );
};

export default App;
