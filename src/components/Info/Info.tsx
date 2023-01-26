import React, {useContext, useState} from 'react';
import {Text, View} from 'react-native';
import {Button} from 'react-native-paper';

import {NotificationContext} from '../../context/NotificationContext';
import useAsyncStorageLib from '../../hooks/useAsyncStorage';

const Info = () => {
  const [fcmTokenValue, setFcmTokenValue] = useState('');
  const [storageValue, updateStorage, hydrated] = useAsyncStorageLib(
    'fcmToken',
    '',
  );
  const {onDisplayNotification} = useContext(NotificationContext);

  const getCachedInfo = () => {
    setFcmTokenValue(storageValue);
  };

  return (
    <>
      <View>
        <Text
          style={{
            fontSize: 14,
            textAlign: 'center',
          }}>
          Token:
        </Text>
        <Text
          style={{
            fontWeight: '700',
            textAlign: 'center',
          }}>
          {fcmTokenValue}
        </Text>
      </View>
      <Button onPress={onDisplayNotification}>Get Local Notification</Button>
      <Button onPress={getCachedInfo}>Get cached token info</Button>
    </>
  );
};

export default Info;
