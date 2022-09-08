import axios from 'axios';

import {getStarwarsData} from './getStarwarsData';
import {getSearch} from './getSearch';
import {getStarships} from './getStarships';
import {getPlanets} from './getPlanets';
import {getPeople} from './getPeople';
import {ISearchResponse} from './types/getSearch.types';
import {IStarshipsResponse} from './types/getStarships.types';
import {IPlanetResponse} from './types/getPlanet.types';
import {IPeopleResponse} from './types/getPeople.types';

axios.defaults.baseURL = `https://swapi.dev/api/`;

interface IApi {
  getSearch: (type: string, query: string) => Promise<ISearchResponse>;
  getStarships: (url: string) => Promise<IStarshipsResponse[]>;
  getPlanets: (url: string) => Promise<IPlanetResponse>;
  getPeople: (url: string) => Promise<IPeopleResponse[]>;
  getStarwarsData: (
    url: string,
  ) => Promise<IPeopleResponse | IPlanetResponse | IStarshipsResponse>;
}

export const api: IApi = {
  getSearch: getSearch,
  getStarships: getStarships,
  getPlanets: getPlanets,
  getPeople: getPeople,
  getStarwarsData: getStarwarsData,
};
