import React, {useEffect, useState} from 'react';
import notifee from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {Alert} from 'react-native';
import useAsyncStorageLib from '../hooks/useAsyncStorage';

type Props = {
  children: React.ReactNode;
};

export const NotificationContext = React.createContext();

async function saveTokenToDatabase(token) {
  // Assume user is already signed in
  const userId = auth().currentUser.uid;

  // Add the token to the users datastore
  await firestore()
    .collection('users')
    .doc(userId)
    .update({
      tokens: firestore.FieldValue.arrayUnion(token),
    });
}

export const NotificationProvider: React.FC<Props> = ({children}) => {
  const [storageValue, updateStorage, hydrated] = useAsyncStorageLib(
    'fcmToken',
    '',
  );

  const onDisplayNotification = async () => {
    console.log('display');
    // Request permissions (required for iOS)
    await notifee.requestPermission();

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
      title: 'Local Test Notification',
      body: 'Main body content of the notification',
      android: {
        channelId,
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
      },
    });
  };

  const onDisplayRemoteNotification = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      await messaging()
        .getToken()
        .then(fcmToken => {
          updateStorage(fcmToken);
        });
    }
  };

  useEffect(() => {
    console.log('storageValue :>> ', storageValue);
    console.log('hydrated :>> ', hydrated);
  }, [storageValue, hydrated]);

  useEffect(() => {
    onDisplayRemoteNotification();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('remoteMessage :>> ', remoteMessage);
      const message = JSON.stringify(remoteMessage);
      console.log('object :>> ', message);
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    // Get the device token
    messaging()
      .getToken()
      .then(token => {
        return saveTokenToDatabase(token);
      });

    // If using other push notification providers (ie Amazon SNS, etc)
    // you may need to get the APNs token instead for iOS:
    // if(Platform.OS == 'ios') { messaging().getAPNSToken().then(token => { return saveTokenToDatabase(token); }); }

    // Listen to whether the token changes
    return messaging().onTokenRefresh(token => {
      saveTokenToDatabase(token);
    });
  }, []);

  return (
    <NotificationContext.Provider value={{onDisplayNotification}}>
      {children}
    </NotificationContext.Provider>
  );
};
