import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Candidat } from '../model/candidat.model';
import { CandidatService } from '../services/candidat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-candidat-form',
  templateUrl: './candidat-form.component.html',
})
export class CandidatFormComponent implements OnInit {
  @Output() formSubmitted = new EventEmitter<Candidat>();
  candidatForm!: FormGroup;
  isLoading = false;
  errorMessage: string | null = null;
  isEditMode: boolean = false; // Nouveau mode pour distinguer modification/ajout
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CandidatFormComponent>,
    private candidatService: CandidatService,
    @Inject(MAT_DIALOG_DATA) public data: Candidat | null // Données du candidat
  ) {}

  ngOnInit(): void {
    this.isEditMode = !!this.data;

   // Initialiser le formulaire avec ou sans données existantes
   this.candidatForm = this.fb.group({
    nomCandidat: [this.data?.nomCandidat || '', Validators.required],
    prenomCandidat: [this.data?.prenomCandidat || '', Validators.required],
    telephoneCandidat: [
      this.data?.telephoneCandidat || '',
      [Validators.required, Validators.pattern(/^\d{9}$/)]
    ],
    email: [this.data?.email || '', [Validators.required, Validators.email]],
    motDePasse: ['', this.isEditMode ? [] : [Validators.required, Validators.minLength(8)]],
    competencesTechnique: [this.data?.competencesTechnique?.join(', ') || '', Validators.required],
    diplome: [this.data?.diplome || '', Validators.required],
    dateNaissance: [this.data?.dateNaissance || '', Validators.required],
    competencesPersonnelles: [this.data?.competencesPersonnelles?.join(', ') || '', Validators.required],
    cvCandidat: [this.data?.cvCandidat || '', Validators.required] // Fichier CV requis
  });
  }

  onSubmit(): void {
    if (this.candidatForm.valid) {
      this.isLoading = true;

      const candidat: Candidat = {
        ...this.data, // Conserve les données existantes si présentes
        ...this.candidatForm.value,
        competencesTechnique: this.candidatForm.value.competencesTechnique.split(',').map((c: string) => c.trim()),
        competencesPersonnelles: this.candidatForm.value.competencesPersonnelles.split(',').map((c: string) => c.trim())
      };

      // Appel au service en mode modification
      const request$ = this.isEditMode
        ? this.candidatService.modifierCandidat(candidat) // Modifier un candidat
        : this.candidatService.enregistrerCandidat(candidat); // Ajouter un candidat

      request$.subscribe({
        next: (response) => {
          this.isLoading = false;
          if (typeof response === 'string') {
            // Si une erreur est retournée sous forme de chaîne
            this.errorMessage = response;
          } else {
            this.dialogRef.close(response); // Ferme le dialogue avec le candidat modifié
            console.log(this.isEditMode ? 'Candidat modifié avec succès.' : 'Candidat ajouté avec succès.');
          }
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = 'Erreur lors de la soumission. Veuillez réessayer.';
          console.error(err);
        }
      });
    }
  }


  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (file.type !== 'application/pdf') {
        this.errorMessage = 'Seuls les fichiers PDF sont autorisés.';
        this.selectedFile = null; // Réinitialiser le fichier sélectionné
      } else {
        this.errorMessage = null;
        this.selectedFile = file;
        this.candidatForm.patchValue({ cvCandidat: this.selectedFile.name }); // Mettre à jour le champ cvCandidat
        console.log('Fichier sélectionné :', this.selectedFile.name);
      }
    }
  }


  cancelForm(): void {
    if (confirm('Êtes-vous sûr de vouloir annuler ?')) {
      this.candidatForm.reset();
      this.dialogRef.close();
      console.log('Formulaire annulé');
    }
  }
}
