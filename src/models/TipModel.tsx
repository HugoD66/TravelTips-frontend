import { PictureModel } from "./PictureModel";
import { CityModel } from "./CityModel";
import { RateModel } from "./RateModel";
import { CommentModel } from "./CommentModel";

export class TipModel {
  public id?: string;
  public name!: string;
  public price!: number;
  public idCity?: CityModel | string;
  public adress?: string;
  public pictures?: PictureModel[];
  public idUser?: string;
  public rate?: RateModel[];
  public comment?: CommentModel[];
  public approvate?: boolean;
  public public?: boolean;
}
