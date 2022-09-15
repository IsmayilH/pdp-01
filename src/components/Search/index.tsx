import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  Alert,
  Button,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {api} from '../../api';
import {IPlanetResponse} from '../../api/types/getPlanet.types';
import DataList from '../DataList';
import {SearchIcon} from '../icons';

const TextInputComponent = ({
  style,
  placeholderStyle,
  value,
  testID,
  ...rest
}) => (
  <TextInput
    testID={testID}
    autoCorrect={false}
    {...rest}
    style={!value ? [style, placeholderStyle] : style}
  />
);

const Search = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [results, setResults] = useState<IPlanetResponse[]>([]);

  const noResultFoundAlert = () =>
    Alert.alert('No result found', 'Try again', [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);

  const onChangeSearch = (query: string) => setSearchQuery(query);

  const showResult = async () => {
    const res = await api.getSearch('planets', searchQuery);
    if (res.count === 0) {
      setSearchQuery('');
      return noResultFoundAlert();
    }
    setResults(res.results);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View testID="search-title-container">
        <Text testID="search-title" style={styles.title}>
          Search Planet
        </Text>
      </View>
      <View style={styles.inputWrapper}>
        <View style={styles.icon} testID="search-icon-container">
          <TouchableOpacity onPress={showResult} testID="search-button">
            <SearchIcon />
          </TouchableOpacity>
        </View>
        <TextInputComponent
          value={searchQuery}
          onChangeText={onChangeSearch}
          placeholder="Search"
          placeholderStyle={styles.placeholderStyle}
          style={styles.input}
          testID="search-bar"
        />
      </View>
      <DataList data={results} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    marginHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 30,
    alignSelf: 'center',
  },
  input: {
    height: 54,
    width: '100%',
  },
  inputWrapper: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor: '#fff',
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  placeholderStyle: {
    fontSize: 24,
  },
  icon: {
    paddingHorizontal: 10,
  },
});

export default Search;
