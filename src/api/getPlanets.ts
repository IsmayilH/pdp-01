import axios from 'axios';
import {IPlanetResponse} from './types/getPlanet.types';

export const getPlanets = async (url: string): Promise<IPlanetResponse> => {
  const res = await axios.get<IPlanetResponse>(url);
  return res.data;
};
