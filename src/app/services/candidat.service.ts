import { Injectable } from '@angular/core';
import { Candidat } from '../model/candidat.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CandidatService {
  private candidats: Candidat[] = [
    {
      candidatId: 1,
      nomCandidat: 'Dupont',
      prenomCandidat: 'Jean',
      telephoneCandidat: '0612345678',
      competencesTechnique: ['Angular', 'Spring Boot', 'Java'],
      diplome: 'Master en Informatique',
      dateNaissance: new Date('1990-05-15'),
      competencesPersonnelles: ['Travail en équipe', 'Adaptabilité', 'Communication'],
      cvCandidat: 'https://example.com/cv/jean_dupont.pdf',
      userId: 1,
      email: 'jean.dupont@example.com',
      motDePasse: 'password123',
      roles: ['CANDIDAT']
    },
    {
      candidatId: 2,
      nomCandidat: 'Martin',
      prenomCandidat: 'Sophie',
      telephoneCandidat: '0623456789',
      competencesTechnique: ['QT', 'Node.js', 'JavaScript'],
      diplome: 'Licence en Génie Logiciel',
      dateNaissance: new Date('1993-08-22'),
      competencesPersonnelles: ['Créativité', 'Résolution de problèmes', 'Organisation'],
      cvCandidat: 'https://example.com/cv/sophie_martin.pdf',
      userId: 2,
      email: 'sophie.martin@example.com',
      motDePasse: 'password456',
      roles: ['CANDIDAT']
    },
    {
      candidatId: 5,
      nomCandidat: 'George',
      prenomCandidat: 'Jean',
      telephoneCandidat: '0612345678',
      competencesTechnique: ['VueJS', 'nextJS', 'Java'],
      diplome: 'BTS en Informatique',
      dateNaissance: new Date('1990-05-15'),
      competencesPersonnelles: ['Travail en équipe', 'Adaptabilité', 'Communication'],
      cvCandidat: 'https://example.com/cv/jean_dupont.pdf',
      userId: 1,
      email: 'jean.dupont@example.com',
      motDePasse: 'password13223',
      roles: ['CANDIDAT']
    },
    {
      candidatId: 12,
      nomCandidat: 'Martin',
      prenomCandidat: 'James',
      telephoneCandidat: '0623456789',
      competencesTechnique: ['Qt', 'C++', 'spring boot'],
      diplome: 'HND en Génie Logiciel',
      dateNaissance: new Date('1993-08-22'),
      competencesPersonnelles: ['Créativité', 'Résolution de problèmes', 'Organisation'],
      cvCandidat: 'https://example.com/cv/sophie_martin.pdf',
      userId: 2,
      email: 'sophie.james@example.com',
      motDePasse: 'password4586',
      roles: ['CANDIDAT']
    }
  ];

  private idCounter = this.candidats.length + 1;

  // Créer un candidat
  enregistrerCandidat(candidat: Candidat): Observable<Candidat | string> {
    // Vérifie si l'email existe déjà
    const emailExists = this.candidats.some(c => c.email === candidat.email);
    if (emailExists) {
      return of('Erreur : un candidat avec cet email existe déjà.');
    }

    // Formatage des données
    const candidatFormate: Candidat = {
      ...candidat,
      candidatId: this.idCounter++, // Génère un ID unique
      competencesTechnique: candidat.competencesTechnique
        ? candidat.competencesTechnique.map((comp: string) => comp.trim())
        : [],
      competencesPersonnelles: candidat.competencesPersonnelles
        ? candidat.competencesPersonnelles.map((comp: string) => comp.trim())
        : [],
      dateNaissance: candidat.dateNaissance instanceof Date
        ? candidat.dateNaissance
        : new Date(candidat.dateNaissance), // S'assure que la date est un objet Date
    };

    // Ajoute le candidat formaté à la liste
    this.candidats.push(candidatFormate);

    return of(candidatFormate);
  }


  // Lire tous les candidats
  consulterCandidats(): Observable<Candidat[]> {
    return of(this.candidats);
  }

  // Lire un candidat par ID
  lireCandidat(id: number): Observable<Candidat | undefined> {
    const candidat = this.candidats.find(c => c.candidatId === id);
    return of(candidat);
  }

  // Mettre à jour un candidat
  modifierCandidat(candidat: Candidat): Observable<Candidat | string> {
    const index = this.candidats.findIndex(c => c.candidatId === candidat.candidatId);
    if (index !== -1) {
      // Vérifie si l'email est utilisé par un autre candidat
      const candidatActuel = this.candidats[index];
      if (candidatActuel.email !== candidat.email) {
        const emailExists = this.candidats.some(
          c => c.email === candidat.email && c.candidatId !== candidat.candidatId
        );
        if (emailExists) {
          return of('Erreur : un autre candidat utilise déjà cet email.');
        }
      }

      // Mise à jour des données
      this.candidats[index] = candidat;
      return of(candidat); // Retourne le candidat modifié
    }
    return of('Erreur : candidat non trouvé.');
  }



  // Supprimer un candidat
  supprimerCandidat(id: number): Observable<string> {
    const index = this.candidats.findIndex(c => c.candidatId === id);
    if (index !== -1) {
      this.candidats.splice(index, 1);
      return of('Candidat supprimé avec succès.');
    }
    return of('Erreur : candidat non trouvé.');
  }
}
