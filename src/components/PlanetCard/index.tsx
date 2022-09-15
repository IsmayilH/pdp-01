import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Card, Title, Paragraph, Button} from 'react-native-paper';
import {IPlanetResponse} from '../../api/types/getPlanet.types';

interface ICardItem {
  data: IPlanetResponse;
  onNextPress: () => void;
  onPrevPress: () => void;
}

const CardItem: React.FC<ICardItem> = ({
  data,
  onNextPress,
  onPrevPress,
}: ICardItem): JSX.Element => {
  const {
    name,
    rotation_period,
    orbital_period,
    diameter,
    climate,
    gravity,
    terrain,
    surface_water,
    population,
  } = data;
  return (
    <View testID="card" style={styles.container}>
      <Card testID="card-wrapper">
        <Card.Content testID="card-content">
          <Title>{`Planet Name - ${name}`}</Title>
          <Paragraph>{`Population - ${population}`}</Paragraph>
          <Paragraph>{`Rotation period - ${rotation_period}`}</Paragraph>
          <Paragraph>{`Orbital period - ${orbital_period}`}</Paragraph>
          <Paragraph>{`Diameter - ${diameter}`}</Paragraph>
          <Paragraph>{`Climate - ${climate}`}</Paragraph>
          <Paragraph>{`Gravity - ${gravity}`}</Paragraph>
          <Paragraph>{`Terrain - ${terrain}`}</Paragraph>
          <Paragraph>{`Surface Water - ${surface_water}`}</Paragraph>
        </Card.Content>
        <Card.Cover source={{uri: 'https://picsum.photos/700'}} />
        <Card.Actions>
          <Button testID="prev-button" onPress={onPrevPress}>
            Prev
          </Button>
          <Button
            testID="next-button"
            onPress={() => {
              onNextPress();
            }}>
            Next
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CardItem;
