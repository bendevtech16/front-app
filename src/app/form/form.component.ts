import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {OffreService} from "../services/offre.service";
import {Experience} from "../enums/experience";
import {Contrat} from "../enums/contrat";
import {Router} from "@angular/router";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {

  protected readonly typeContratEnum = Contrat;
  protected readonly niveauExperienceEnum = Experience;
  isOverlayVisible = false;
  offreForm!: FormGroup;
  constructor(public fB: FormBuilder, public router:Router, public offreService:OffreService) {
  }

  // Ouvrir l'overlay
  openOverlay() {
    this.isOverlayVisible = true;
  }

  // Fermer l'overlay
  closeOverlay() {
    this.isOverlayVisible = false;
    this.router.navigateByUrl("/admin");
  }

  // Soumettre le formulaire
  submitForm() {
    // Logique de soumission du formulaire ici
    alert('Formulaire soumis');
    this.closeOverlay(); // Fermer l'overlay après soumission
    this.offreForm.reset();
  }

}
