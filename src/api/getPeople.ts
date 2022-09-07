import axios from 'axios';
import {IPeopleResponse} from './types/getPeople.types';

export const getPeople = async (url: string): Promise<IPeopleResponse[]> => {
  const res = await axios.get<IPeopleResponse[]>(url);
  return res.data;
};
