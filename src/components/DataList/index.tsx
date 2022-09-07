import React from 'react';
import {FlatList} from 'react-native';
import DataListItem from './DataListItem.tsx';
import {IPeopleResponse} from '../../api/types/getPeople.types';

interface IDataList {
  data: IPeopleResponse[];
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
