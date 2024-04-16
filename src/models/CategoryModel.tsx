import {ItineraryModel} from "./ItineraryModel";

export class CategoryModel {
  id!: string;
  name!: string;
  itinerary: ItineraryModel[] | string[] = [];
}
