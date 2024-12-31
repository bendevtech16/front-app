import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Offre } from '../model/offre.model';
import { Contrat } from '../enums/contrat';
import { Experience } from '../enums/experience';

@Component({
  selector: 'app-detail-offre',
  templateUrl: './detail-offre.component.html'
})
export class DetailOffreComponent {
  offreForm: FormGroup;
  imageUrl: string | ArrayBuffer | null = null;
  typeContratEnum = Contrat;
  niveauExperienceEnum = Experience;
  maxSizeInBytes = 2 * 1024 * 1024; // 2 MB

  editMode!: boolean;
  constructor(
    public dialogRef: MatDialogRef<DetailOffreComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.offreForm = this.fb.group({
      titrePoste: [data.titrePoste],
      description: [data.description],
      competences: [data.competences],
      lieu: [data.lieu],
      typeContrat: [data.typeContrat],
      salaire: [data.salaire],
      dateDebut: [data.dateDebut],
      secteurActivite: [data.secteurActivite],
      niveau: [data.niveau],
      niveauEtude: [data.niveauEtude],
      anneesExperience: [data.anneesExperience],
      illustration: [data.illustration]
    });
    this.imageUrl = data.illustration;
    this.editMode = data.editMode || false;
  }

  enableEditMode() {
    this.editMode = true;
  }

  onFileChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result;
        this.offreForm.patchValue({ illustration: reader.result });
      };
      reader.readAsDataURL(file);
    }
  }

  onSave() {
    const updatedData = { ...this.data, ...this.offreForm.value, illustration: this.imageUrl };
    this.dialogRef.close(updatedData);
  }

  onCancel() {
    this.dialogRef.close();
    
  }
}
