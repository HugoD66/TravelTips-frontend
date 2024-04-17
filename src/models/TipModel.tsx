import { PictureModel } from "./PictureModel";
import { CityModel } from "./CityModel";
import { RateModel } from "./RateModel";
import { CommentModel } from "./CommentModel";

export class TipModel {
  id?: string;
  name!: string;
  price!: number;

  idCity?: CityModel | string;

  numberAdress?: number;
  adress?: string;
  picture?: PictureModel[];

  rate?: RateModel[];
  comment?: CommentModel[];
  approvate?: boolean;
}
