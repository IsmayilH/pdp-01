import axios from 'axios';
import {IStarshipsResponse} from './types/getStarships.types';

export const getStarships = async (
  url: string,
): Promise<IStarshipsResponse[]> => {
  const res = await axios.get<IStarshipsResponse[]>(url);
  return res.data;
};
