import { PictureModel } from "./PictureModel";
import { CityModel } from "./CityModel";
import { RateModel } from "./RateModel";
import { CommentModel } from "./CommentModel";
import { GeoModel } from "./GeoModel";
import { User } from "./UserData";

export class TipModel {
  public id?: string;
  public name!: string;
  public price!: number;
  public idCity?: CityModel | string;
  public adress?: string;
  public idUser?: User | string;
  public approvate?: string;
  public geo?: GeoModel;
}
