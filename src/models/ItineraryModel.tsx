import { DayItineraryModel } from "./DayItineraryModel";
import { UserModel } from "./UserModel";
import { CategoryModel } from "./CategoryModel";

export class ItineraryModel {
  id?: string;
  name!: string;
  numberDay!: number;
  dayOne?: string;
  lastDay?: string;
  idCategory?: CategoryModel | string;
  idUser?: UserModel | string;
  public?: boolean;
}
