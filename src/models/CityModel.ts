import {TipModel} from "./TipModel";
import {CountryModel} from "./CountryModel";

export class CityModel {
  id!: string;
  name!: string;
  zipCode!: number;
  idCountry?: CountryModel | null;
  tips: TipModel[] | string[] = [];
}
