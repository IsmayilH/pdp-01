import React, {useEffect, useState} from 'react';
import useSWR from 'swr';
import analytics from '@react-native-firebase/analytics';
import {api} from '../../api';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import PlanetCard from '../PlanetCard';

const Home = () => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState<boolean>(false);

  const {data: currentData} = useSWR(`planets/${page}/`, api.getPlanets);

  useEffect(() => {
    currentData &&
      analytics().logEvent('planet_card_visible', {
        id: 3745092,
        item: 'animal grey t-shirt',
      });
  }, [currentData]);

  useEffect(() => {
    if (!currentData) return setLoading(true);
    return setLoading(false);
  }, [currentData]);

  const onNextPress = () => {
    if (page > 59) return;
    setPage(page + 1);
    analytics().logEvent('change_page', {
      type: 'next',
      page: page,
    });
  };

  const onPrevPress = () => {
    if (page < 2) return;
    setPage(page - 1);
    analytics().logEvent('change_page', {
      type: 'prev',
      page: page,
    });
  };

  return (
    <View testID="home-component" style={styles.container}>
      {loading && <ActivityIndicator size="large" />}
      {currentData && (
        <PlanetCard
          onNextPress={onNextPress}
          onPrevPress={onPrevPress}
          data={currentData}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    marginTop: 40,
    paddingHorizontal: 20,
  },
});

export default Home;
