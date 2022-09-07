import axios from 'axios';
import {ISearchResponse} from './types/getSearch.types';

export const getSearch = async (
  type: string,
  query: string,
): Promise<ISearchResponse> => {
  const res = await axios.get<ISearchResponse>(
    `https://swapi.dev/api/${type}/?search=${query}`,
  );
  return res.data;
};
