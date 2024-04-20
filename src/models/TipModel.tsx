import { PictureModel } from "./PictureModel";
import { CityModel } from "./CityModel";
import { RateModel } from "./RateModel";
import { CommentModel } from "./CommentModel";

export class TipModel {
  id?: string;
  name!: string;
  price!: number;
  numberAdress?: number;
  idCity?: CityModel | string;
  adress?: string;
  pictures?: PictureModel[];
  idUser?: string;
  rate?: RateModel[];
  comment?: CommentModel[];
  approvate?: boolean;
  public?: boolean;
}
