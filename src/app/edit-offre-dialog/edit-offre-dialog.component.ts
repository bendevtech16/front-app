import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contrat } from '../enums/contrat';
import { Experience } from '../enums/experience';

@Component({
  selector: 'app-edit-offre-dialog',
  templateUrl: './edit-offre-dialog.component.html',
})
export class EditOffreDialogComponent {
  offreForm: FormGroup;

  imageUrl: string | ArrayBuffer | null = null;
  typeContratEnum = Contrat;
  niveauExperienceEnum = Experience;
  maxSizeInBytes = 2 * 1024 * 1024; // 2 MB
  editMode!: boolean;

  constructor(
    public dialogRef: MatDialogRef<EditOffreDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.offreForm = this.fb.group({
      titrePoste: [data.titrePoste, Validators.required],
      description: [data.description],
      competences: [data.competences],
      lieu: [data.lieu],
      typeContrat: [data.typeContrat],
      salaire: [data.salaire, Validators.required],
      dateDebut: [data.dateDebut],
      secteurActivite: [data.secteurActivite],
      niveau: [data.niveau],
      niveauEtude: [data.niveauEtude],
      anneesExperience: [data.anneesExperience],
      illustration: [data.illustration],
    });
    this.imageUrl = data.illustration;
    this.editMode = data.editMode || false;
  }
  onSave() {
    if (this.offreForm.valid) {
      this.dialogRef.close(this.offreForm.value); // Retourne les valeurs modifiées
    }
  }
  enableEditMode() {
    this.editMode = true;
  }
  onFileChange(event: any) {
    const file = event.target.files[0];
    const target = event.target as HTMLInputElement;

    if (file) {
      if (!this.isValidFileType(file)) {
        alert('Seuls les fichiers JPG, JPEG et PNG sont acceptés.');
        event.target.value = '';
      } else if (!this.isValidFileSize(file)) {
        alert('La taille du fichier doit être inférieure ou égale à 2MB.');
        event.target.value = '';
      }else{
        const reader = new FileReader();
        reader.onload = () => {
          this.imageUrl = reader.result;
          this.offreForm.patchValue({illustration: reader.result});
        };
        reader.readAsDataURL(file);
      }
    }
  }

  isValidFileType(file: File): boolean {
    const allowedTypes = ['image/jpeg', 'image/png','image/jpg'];
    return allowedTypes.includes(file.type);
  }

  isValidFileSize(file: File): boolean {
    return file.size <= this.maxSizeInBytes;
  }

}
