import {UserModel} from "./UserModel";
import {PictureModel} from "./PictureModel";
import {CityModel} from "./CityModel";
import {RateModel} from "./RateModel";
import {CommentModel} from "./CommentModel";
import {DayItineraryModel} from "./DayItineraryModel";

export class TipModel {
  id?: string;
  name!: string;
  price!: number;

  idCity?: CityModel | string;

  numberAdress?: number;
  adress?: string;
  dayItinerary?: DayItineraryModel[];
  picture?: PictureModel[];

  rate?: RateModel[];
  comment?: CommentModel[];
}
