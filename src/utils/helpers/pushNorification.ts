import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}

const getFcmToken = () => {
  try {
    let oldFcmToken = AsyncStorage.getItem('fcmtoken');
    if (!oldFcmToken) {
      let newFcmToken = messaging().getToken();
      AsyncStorage.setItem('fcmtoken', newFcmToken);
    }
  } catch (error) {
    console.log('error', error);
  }
};
