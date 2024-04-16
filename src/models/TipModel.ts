import {UserModel} from "./UserModel";
import {PictureModel} from "./PictureModel";
import {CityModel} from "./CityModel";
import {RateModel} from "./RateModel";
import {CommentModel} from "./CommentModel";
import {DayItineraryModel} from "./DayItineraryModel";

export class TipModel {
  id?: string;
  name!: string;
  numberAdress!: number;
  adress!: string;
  price!: number;
  idUser?: UserModel | string;
  idCity?: CityModel | string;
  rate?: RateModel[];
  comment?: CommentModel[];
  dayItinerary?: DayItineraryModel[];
  picture?: PictureModel[];
}
