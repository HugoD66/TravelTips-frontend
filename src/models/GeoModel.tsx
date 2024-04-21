import {CountryModel} from "./CountryModel";
import {TipModel} from "./TipModel";

export class GeoModel {
  public id?: string;
  public lat!: string;
  public lng!: string;
  public country?: CountryModel;
  public countryId?: string;
  public tip?: TipModel;

}