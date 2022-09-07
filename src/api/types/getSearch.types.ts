import {IStarshipsResponse} from './getStarships.types';
import {IPeopleResponse} from './getPeople.types';
import {IPlanetResponse} from './getPlanet.types';

export interface ISearchResponse {
  count: number;
  next: null;
  previous: null;
  results: IPlanetResponse[] | IPeopleResponse[] | IStarshipsResponse[];
}
