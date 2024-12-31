// fichier: model/candidat.model.ts

import { User } from './user.model';

export class Candidat extends User {
  candidatId!: number;
  nomCandidat!: string;
  prenomCandidat!: string;
  telephoneCandidat!: string;
  competencesTechnique!: string[];
  cvCandidat!: string;
  diplome!: string;
  dateNaissance!: Date;
  competencesPersonnelles!: string[];

  constructor() {
    super();
    this.roles = ['CANDIDAT']; // Par défaut, rôle candidat
  }


}
