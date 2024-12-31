// fichier: model/entreprise.model.ts

import { User } from './user.model';

export class Entreprise extends User {
  entrepriseId!: number;
  nomEntreprise!: string;
  telephoneEntreprise!: string;
  logoEntreprise!: string;

  constructor() {
    super();
    this.roles = ['ENTREPRISE']; // Par défaut, rôle entreprise
  }

  
}
