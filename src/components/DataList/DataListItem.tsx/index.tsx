import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Card, Paragraph, Title} from 'react-native-paper';
import {IPlanetResponse} from '../../../api/types/getPlanet.types';

interface IDataListItem {
  item: IPlanetResponse;
}

const DataListItem: React.FC<IDataListItem> = ({
  item,
}: IDataListItem): JSX.Element => {
  const {name, population, rotation_period} = item;
  return (
    <TouchableOpacity testID="search-card" style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>{`Planet Name - ${name}`}</Title>
          <Paragraph>{`Population - ${population}`}</Paragraph>
          <Paragraph>{`Rotation period - ${rotation_period}`}</Paragraph>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 10,
  },
  card: {
    borderRadius: 16,
  },
});

export default DataListItem;
