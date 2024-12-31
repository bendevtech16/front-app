export class User {
  userId!: number;
  email!: string;
  motDePasse!: string;
  roles: string[];

  constructor() {
    this.roles = [];
  }
}
