import AsyncStorageLib from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';

const useAsyncStorageLib = (key: string, defaultValue: string | undefined) => {
  const [state, setState] = useState({
    hydrated: false,
    storageValue: defaultValue,
  });
  const {hydrated, storageValue} = state;

  async function pullFromStorage() {
    const fromStorage = await AsyncStorageLib.getItem(key);
    let value = defaultValue;
    if (fromStorage) {
      value = JSON.parse(fromStorage);
    }
    setState({hydrated: true, storageValue: value});
  }

  async function updateStorage(newValue: string) {
    setState({hydrated: true, storageValue: newValue});
    const stringifiedValue = JSON.stringify(newValue);
    await AsyncStorageLib.setItem(key, stringifiedValue);
  }

  useEffect(() => {
    pullFromStorage();
  }, []);

  return [storageValue, updateStorage, hydrated];
};
export default useAsyncStorageLib;
