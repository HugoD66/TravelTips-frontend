export class UserModel {
  // id?: string;
  firstName!: string;
  lastName!: string;
  mail!: string;
  birthday!: string;
  password?: string; //TODO Voir si on peut empecher le retour du password
}
