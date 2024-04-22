import {CityModel} from "./CityModel";

export class CountryModel {
  id!: string;
  name!: string;
  city: CityModel[]   = [];
}
