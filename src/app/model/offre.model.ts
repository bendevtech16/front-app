
import {Contrat} from "../enums/contrat";
import {Experience} from "../enums/experience";


export interface Offre {
  offreId: number;
  titrePoste: string;
  description: string;
  competences: string[]; // Tableau de compétences
  lieu: string;
  typeContrat: Contrat;
  salaire: number;
  dateDebut: Date;
  secteurActivite: string;
  niveauEtude: string;
  niveau: Experience;
  anneesExperience: number;
  postule: boolean;
  illustration: string;
  
}

export interface PageOffre{
  totalElements: number;
  offres:Offre[];
  page: number;
  size: number;
  totalPages: number;
}
