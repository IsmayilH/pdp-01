import {IPlanetResponse} from './getPlanet.types';

export interface ISearchResponse {
  count: number;
  next: null;
  previous: null;
  results: IPlanetResponse[];
}
