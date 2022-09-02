import React, {useState, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import TabNavigation from './TabNavigation';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import Auth from '../screens/Auth';

const RootStack = createStackNavigator();

const RootNavigator = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  // Handle user state changes
  const onAuthStateChanged = (currentUser: FirebaseAuthTypes.User) => {
    setUser(currentUser);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <RootStack.Navigator screenOptions={{}}>
      {user ? (
        <RootStack.Screen name=" " component={TabNavigation} />
      ) : (
        <RootStack.Screen name="Auth" component={Auth} />
      )}
    </RootStack.Navigator>
  );
};

export default RootNavigator;
