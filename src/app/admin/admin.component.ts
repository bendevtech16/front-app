import {ChangeDetectionStrategy, Component, ElementRef, EventEmitter, inject, OnInit, Output, ViewChild} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Contrat} from "../enums/contrat";
import {Experience} from "../enums/experience";
import {OffreService} from "../services/offre.service";
import {Router} from "@angular/router";
import {Offre} from "../model/offre.model";
import { Role } from '../model/appUser.model';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,

})

export class AdminComponent implements OnInit {
  offreFormGroup!: FormGroup;
  typeContratEnum = Contrat;
  niveauExperienceEnum = Experience;
  public offres!:Array<Offre>
  imageUrl: string | ArrayBuffer | null = null;
  maxSizeInBytes = 2 * 1024 * 1024; // 2 MB
  activeButton: string = 'dashboard';
  @ViewChild('descriptionInput') descriptionInput!: ElementRef;


  @Output() formClosed = new EventEmitter<void>();
  
  constructor(public authService: AuthService,
     public  router:Router,
      public fb :FormBuilder,
      public jobOfferService:OffreService) {
  }
  ngOnInit() {
    this.offreFormGroup = this.fb.group({
      titrePoste: ['', Validators.required],
      description: ['', Validators.required],
      competences: ['', Validators.required],
      lieu: ['', Validators.required],
      typeContrat: ['', Validators.required],
      salaire: ['', [Validators.required, Validators.min(0)]],
      dateDebut: ['', Validators.required],
      secteurActivite: ['', Validators.required],
      niveau: ['', Validators.required],
      niveauEtude: ['', Validators.required],
      anneesExperience: ['', [Validators.required, Validators.min(0)]],
      illustration: [null, Validators.required]
    });
    let offre = this.offreFormGroup.value
    this.offres.push(offre)
     // this.jobOfferService.addNewOffre(offre)
  }

  logout() {
    this.authService.logout()
  }
  /**
   *
   * @param button bouton actif passer en paramettre
   */
  setActiveButton(button: string) {
    this.activeButton = button;
  }

  isOverlayVisible = false;

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
    this.offreFormGroup.reset();
  }
  /**
   * mise en forme du texte dans  le input de description
   * @param format
   */
  applyFormat(format: string) {
    const textarea = this.descriptionInput.nativeElement;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);

    let formattedText = selectedText;

    switch (format) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        break;
      case 'underline':
        formattedText = `<u>${selectedText}</u>`;
        break;
      case 'list':
        formattedText = `• ${selectedText.split('\n').join('\n• ')}`;
        break;
      case 'center':
        formattedText = `<div style="text-align: center;">${selectedText}</div>`;
        break;
      case 'justify':
        formattedText = `<div style="text-align: justify;">${selectedText}</div>`;
        break;
    }

    textarea.setRangeText(formattedText, start, end, 'select');
    this.offreFormGroup.get('description')?.setValue(textarea.value);
  }

  handleAddOffre() {
    if (this.offreFormGroup.valid) {
     let  offre = this.offreFormGroup.value;
      this.jobOfferService.addNewOffre(offre);

      alert("Offre creee avec succes!")
      this.offreFormGroup.reset()
      this.router.navigateByUrl("/admin");

      this.formClosed.emit();
    }
    else (alert("Remplissez tous les champs..."))
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
          this.offreFormGroup.patchValue({illustration: reader.result});
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


  closeForm() {
    this.formClosed.emit();
  }

}
