import { CityModel } from "./CityModel";
import { User } from "./UserData";

export class TipModel {
  public id?: string;
  public name!: string;
  public price!: number;
  public lng!: string;
  public lat!: string;
  public idCity!: CityModel | string;
  public address!: string;
  public idUser!: User | string;
  public approvate!: string;
}
