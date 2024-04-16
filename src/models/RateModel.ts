import {UserModel} from "./UserModel";
import {TipModel} from "./TipModel";

export class RateModel {
  id?: string;
  rate!: number;
  idTip?: TipModel | string;
  idUser?: UserModel | string;
}
