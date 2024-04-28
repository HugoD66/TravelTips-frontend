import { TipModel } from "./TipModel";
import { ItineraryModel } from "./ItineraryModel";

export class DayItineraryModel {
  id!: string;
  orderInDay?: number;
  date!: Date;
  idTips?: string | TipModel[];
  idItinerary?: string | ItineraryModel;
}
