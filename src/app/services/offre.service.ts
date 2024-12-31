import { Injectable } from '@angular/core';
import {Offre, PageOffre} from "../model/offre.model";
import {Contrat} from "../enums/contrat";
import {Experience} from "../enums/experience";
import {min, Observable, of, throwError} from "rxjs";
import max from 'uuid/dist/cjs/max';


@Injectable({
  providedIn: 'root'
})
export class OffreService {
  private offres!: Array<Offre>;
  private postulants: Map<number, Set<number>> = new Map(); // Associe offreId à l'ensemble des id des candidats
  private idCounter = 1; // Compteur pour générer des IDs uniques pour les offres

  constructor() {

  this.offres = [
    {
      offreId: 45,
      titrePoste: 'developpeur fullstack',
      description: 'djkjhwjfjjw',
      competences: ["angular","springBoot","react","flutter","django","Microservice","docker"],
      lieu: 'YAOUNDE',
      typeContrat:Contrat.CDD ,
      salaire: 60000,
      dateDebut: new Date(),
      secteurActivite: 'technologies',
      niveauEtude:" minimum Bac+3",
      niveau: Experience.INTERMEDIAIRE,
      anneesExperience: 3,
      postule:false,
      illustration: "assets/images.jpg"
    },
    {
      offreId: 67,
      titrePoste: 'backend engineer',
      description: 'djkjhwjfjjw',
      competences: ["angular","springBoot","react","flutter","django","Microservice","docker"],
      lieu: 'Douala',
      typeContrat:Contrat.CDD ,
      salaire: 399999,
      dateDebut: new Date(),
      secteurActivite: 'technologies',
      niveauEtude:"Bac+5",
      niveau: Experience.INTERMEDIAIRE,
      anneesExperience: 2,
      postule:false,
      illustration: "\C:\\Users\\BENJAMIN\\Pictures\\imgs\\UOVR5564.JPG"
    },
    {
      offreId: 34,
      titrePoste: 'Directeur des RH',
      description: 'djkjhwjfjjw',
      competences: ["angular","springBoot","react","flutter","django","Microservice","docker"],
      lieu: 'paris',
      typeContrat:Contrat.CDD ,
      salaire: 399999,
      dateDebut: new Date(),
      secteurActivite: 'technologies',
      niveauEtude:" minimum Bac+2",
      niveau: Experience.DEBUTANT,
      anneesExperience: 6,
      postule:true,
      illustration: "C:\\Users\\BENJAMIN\\Pictures\\imgs\\LQMS3749.JPG"
    },

    {
      offreId: 1,
      titrePoste: 'frontend React',
      description: 'djkjhwjfjjw',
      competences: ["angular","springBoot","react","flutter","django","Microservice","docker"],
      lieu: 'Toronto',
      typeContrat:Contrat.CDD ,
      salaire: 399999,
      dateDebut: new Date(),
      secteurActivite: 'technologies',
      niveauEtude:" minimum Bac+2",
      niveau: Experience.DEBUTANT,
      anneesExperience: 6,
      postule:false,
      illustration: "C:\\Users\\BENJAMIN\\Pictures\\CamScanner 18-08-2024 21.06.jpg"
    }


  ];
  for(let i = 0; i <20; i++)
    {
      this.offres.push( {
        offreId: 45,
        titrePoste: 'developpeur fullstack',
        description: 'djkjhwjfjjw',
        competences: ["angular","springBoot","react","flutter","django","Microservice","docker"],
        lieu: 'YAOUNDE',
        typeContrat:Contrat.CDD ,
        salaire: 60000,
        dateDebut: new Date(),
        secteurActivite: 'technologies',
        niveauEtude:" minimum Bac+3",
        niveau: Experience.INTERMEDIAIRE,
        anneesExperience: 3,
        postule:false,
        illustration: "assets/images.jpg"
      });
      this.offres.push({
        offreId: 67,
        titrePoste: 'backend engineer',
        description: 'djkjhwjfjjw',
        competences: ["angular","springBoot","react","flutter","django","Microservice","docker"],
        lieu: 'Douala',
        typeContrat:Contrat.CDD ,
        salaire: 399999,
        dateDebut: new Date(),
        secteurActivite: 'technologies',
        niveauEtude:"Bac+5",
        niveau: Experience.INTERMEDIAIRE,
        anneesExperience: 2,
        postule:false,
        illustration: "\C:\\Users\\BENJAMIN\\Pictures\\imgs\\UOVR5564.JPG"
      });
      this.offres.push( {
        offreId: 34,
        titrePoste: 'Directeur des RH',
        description: 'djkjhwjfjjw',
        competences: ["angular","springBoot","react","flutter","django","Microservice","docker"],
        lieu: 'paris',
        typeContrat:Contrat.CDD ,
        salaire: 399999,
        dateDebut: new Date(),
        secteurActivite: 'technologies',
        niveauEtude:" minimum Bac+2",
        niveau: Experience.DEBUTANT,
        anneesExperience: 6,
        postule:false,
        illustration: "C:\\Users\\BENJAMIN\\Pictures\\imgs\\LQMS3749.JPG"
      });
      this.offres.push({
        offreId: 10,
        titrePoste: 'frontend React',
        description: 'djkjhwjfjjw',
        competences: ["angular","springBoot","react","flutter","django","Microservice","docker"],
        lieu: 'Toronto',
        typeContrat:Contrat.CDD ,
        salaire: 399999,
        dateDebut: new Date(),
        secteurActivite: 'technologies',
        niveauEtude:" minimum Bac+2",
        niveau: Experience.DEBUTANT,
        anneesExperience: 6,
        postule:false,
        illustration: "C:\\Users\\BENJAMIN\\Pictures\\CamScanner 18-08-2024 21.06.jpg"
      });
      this.offres.push( {
        offreId: 1,
        titrePoste: 'frontend React',
        description: 'djkjhwjfjjw',
        competences: ["angular","springBoot","react","flutter","django","Microservice","docker"],
        lieu: 'Toronto',
        typeContrat:Contrat.CDD ,
        salaire: 399999,
        dateDebut: new Date(),
        secteurActivite: 'technologies',
        niveauEtude:" minimum Bac+2",
        niveau: Experience.DEBUTANT,
        anneesExperience: 6,
        postule:false,
        illustration: "C:\\Users\\BENJAMIN\\Pictures\\CamScanner 18-08-2024 21.06.jpg"
      });
    }
  }


  // Méthode de pagination pour récupérer les offres par page
  public getPageOffres(page: number, size: number): Observable<PageOffre> {
    const totalElements = this.offres.length;  // Total des offres disponibles
    const totalPages = Math.ceil(totalElements / size);
    const index = page * size;
    const pageOffre = this.offres.slice(index, index + size);

    return of({
      page: page,
      size: size,
      totalPages: totalPages,
      totalElements: totalElements, // Ajout de totalElements
      offres: pageOffre
    });
  }

  // Méthode de recherche avec pagination pour trouver toutes les offres contenant le mot-clé
  searchOffres(keyword: string, page: number, size: number): Observable<PageOffre> {
    // Filtre les offres contenant le mot-clé (insensible à la casse)
    const result = this.offres.filter(offre =>
      offre.titrePoste.toLowerCase().includes(keyword.toLowerCase())
    );

    const totalElements = result.length;
    const totalPages = Math.ceil(totalElements / size);
    const startIndex = page * size;
    const pageOffres = result.slice(startIndex, startIndex + size);

    return of({
      page,
      size,
      totalPages,
      totalElements,
      offres: pageOffres
    });
  }

  public deleteOffre(id:number): Observable<boolean> {
    this.offres = this.offres.filter(offre => offre.offreId != id);
    return of(true);
  }

  public setPostule(id:number): Observable<boolean> {
    const offre = this.offres.find(o => o.offreId == id);
    if (offre != undefined) {
      offre.postule = !offre.postule;
      return of(true);
    } else {
      return throwError(() => new Error("offre non trouvee"));
    }
  }

  public getOffreById(id:number): Observable<Offre> {
    const offre = this.offres.find(o => o.offreId == id);
    if (offre == undefined) return throwError(() => new Error("offre non trouvee"));
    return of(offre);
  }

  getAllOffre(): Observable<Array<Offre>> {
    return of(this.offres);
  }

  addNewOffre(offre: Partial<Offre>): Observable<Offre> {
    const newOffre: Offre = {
      offreId: Math.random() *1000+1, // Générer un numbre
      titrePoste: offre.titrePoste!,
      description: offre.description || '',
      competences: offre.competences ? offre.competences[0].split('-').map(c => c.trim()) : [], // Conversion de compétence
      lieu: offre.lieu || '',
      typeContrat: offre.typeContrat!,
      salaire: offre.salaire || 0,
      dateDebut: offre.dateDebut || new Date(),
      secteurActivite: offre.secteurActivite || '',
      niveauEtude: offre.niveauEtude || '',
      niveau: offre.niveau!,
      anneesExperience: offre.anneesExperience || 0,
      postule: false,
      illustration: offre.illustration || ''
    };
    
    this.offres.push(newOffre);
    return of(newOffre);
  }

  public updateOffre(offre: Offre): Observable<Offre> {
    const index = this.offres.findIndex(o => o.offreId === offre.offreId);
    if (index !== -1) {
      this.offres[index] = offre; // Remplace l'offre par l'offre modifiée
    }
    return of(offre); // Retourne l'offre mise à jour
  }
  getRandomNumber(): number {
    return Math.floor(Math.random() * 1000) + 1;
  }

  postulerOffre(offreId: number, candidatId: number): Observable<boolean> {
    if (this.aDejaPostule(offreId, candidatId)) {
      return of(false); // Si le candidat a déjà postulé, on renvoie false
    }
    // Enregistrer la candidature
    if (!this.postulants.has(offreId)) {
      this.postulants.set(offreId, new Set());
    }
    this.postulants.get(offreId)!.add(candidatId);
    return of(true); // Postulation réussie
  }

  aDejaPostule(offreId: number, candidatId: number): boolean {
    return this.postulants.has(offreId) && this.postulants.get(offreId)!.has(candidatId);
  }

}


