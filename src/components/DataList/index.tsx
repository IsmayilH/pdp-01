import React from 'react';
import {FlatList} from 'react-native';
import DataListItem from './DataListItem.tsx';
import {IPlanetResponse} from '../../api/types/getPlanet.types';

interface IDataList {
  data: IPlanetResponse[];
}

const DataList: React.FC<IDataList> = ({data}: IDataList): JSX.Element => {
  return (
    <FlatList
      data={data}
      renderItem={DataListItem}
      keyExtractor={item => item.name}
    />
  );
};

export default DataList;
