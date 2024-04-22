import {TipModel} from "./TipModel";
import {CountryModel} from "./CountryModel";

export class CityModel {
  id?: string;
  name!: string;
  zipCode?: string;
  idCountry?: CountryModel | null;
  tips?: TipModel[] | string[] = [];
}
