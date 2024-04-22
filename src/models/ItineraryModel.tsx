import {DayItineraryModel} from "./DayItineraryModel";
import {UserModel} from "./UserModel";
import {CategoryModel} from "./CategoryModel";

export class ItineraryModel {
  id!: string;
  name!: string;
  numberDay!: number;
  dayOne?: Date;
  lastDay?: Date;
  idCategory?: CategoryModel | string;
  idUser?: UserModel | string;
  dayItinerary: DayItineraryModel[] = [];
}
