import {TipModel} from "./TipModel";

export class PictureModel {
  public id?: string | undefined;
  public url: string | undefined | File;
  public createdBy: string | undefined;
  public idTips?: TipModel ;

}
