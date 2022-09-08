import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Searchbar} from 'react-native-paper';
import {api} from '../../api';
import {IPlanetResponse} from '../../api/types/getPlanet.types';
import DataList from '../DataList';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [results, setResults] = useState<IPlanetResponse[]>([]);

  const onChangeSearch = (query: string) => setSearchQuery(query);

  const showResult = async () => {
    const res = await api.getSearch('planets', searchQuery);

    setResults(res.results);
  };

  useEffect(() => {
    console.log('results :>> ', results);
  }, [results]);

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        onIconPress={showResult}
      />

      <DataList data={results} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Search;
