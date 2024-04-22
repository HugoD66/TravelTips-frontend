import { CityModel } from "./CityModel";
import { User } from "./UserData";

export class TipModel {
  public id?: string;
  public name!: string;
  public price!: number;
  public idCity?: CityModel | string;
  public adress?: string;
  public idUser?: User | string;
  public approvate?: boolean;
  public lng!: string;
  public lat!: string;
}
