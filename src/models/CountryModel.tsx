import {CityModel} from "./CityModel";
import {GeoModel} from "./GeoModel";

export class CountryModel {
  id!: string;
  name!: string;
  city: CityModel[]   = []; //| string[] //TODO Voir pour ca
  geoCoords: GeoModel[] =[];
}
