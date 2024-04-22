export class UserModel {
  // id?: string;
  firstname!: string;
  lastname!: string;
  mail!: string;
  birthday!: string;
  password?: string; //TODO Voir si on peut empecher le retour du password
}
