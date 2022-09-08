import axios from 'axios';
import {IPeopleResponse} from './types/getPeople.types';
import {IPlanetResponse} from './types/getPlanet.types';
import {IStarshipsResponse} from './types/getStarships.types';

export const getStarwarsData = async (
  url: string,
): Promise<IPeopleResponse | IPlanetResponse | IStarshipsResponse> => {
  const res = await axios.get<
    IPeopleResponse | IPlanetResponse | IStarshipsResponse
  >(url);
  return res.data;
};
