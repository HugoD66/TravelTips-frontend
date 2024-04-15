import {TipModel} from "./TipModel";
import {UserModel} from "./UserModel";

export class CommentModel {
  id!: string;
  comment!: string;
  date?: Date;
  idTips?: TipModel | string;
  idUser?: UserModel | string;
}
