import { Component, Inject, inject, OnInit } from '@angular/core';
import { OffreService } from "../services/offre.service";
import { Offre, PageOffre } from "../model/offre.model";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DetailOffreComponent } from '../detail-offre/detail-offre.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { EditOffreDialogComponent } from '../edit-offre-dialog/edit-offre-dialog.component';
import { CandidatService } from '../services/candidat.service';
import { Candidat } from '../model/candidat.model';

@Component({
  selector: 'app-offre',
  templateUrl: './offre.component.html',
  styleUrls: ['./offre.component.css']
})
export class OffreComponent implements OnInit {
  offres: Array<Offre> = [];
  imageUrl: string | ArrayBuffer | null = null;
  currentPage: number = 0;
  pageSize: number = 8;
  totalElements: number = 0;
  searchFormGroup!: FormGroup;
  keyword: string | any;
  currentAction: string = 'all';

  constructor(
    private offreService: OffreService,
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private candidatService: CandidatService

  ) {}

  ngOnInit(): void {
    // Initialisation du formulaire de recherche
    this.searchFormGroup = this.fb.group({
      search: this.fb.control(null)
    });

    // Détection des changements dans le champ de recherche
    this.searchFormGroup.get('search')?.valueChanges
      .pipe(
        debounceTime(300), // Attente de 300 ms pour éviter de déclencher trop de requêtes
        distinctUntilChanged() // Effectuer la recherche seulement si le mot-clé change
      )
      .subscribe(keyword => {
        this.keyword = keyword;
        this.currentPage = 0; // Réinitialiser la pagination
        if (this.keyword) {
          this.handleSearchOffre(); // Recherche instantanée
        } else {
          this.handleGetPageOffre(); // Charger toutes les offres si le champ est vide
        }
      });

    // Chargement initial des offres avec pagination
    this.handleGetPageOffre();
  }

  openDialog() {
    const dialogRef = this.dialog.open(DetailOffreComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


  // Méthode pour récupérer toutes les offres en fonction de la page actuelle
  handleGetPageOffre() {
    this.currentAction = 'all';
    this.offreService.getPageOffres(this.currentPage, this.pageSize).subscribe({
      next: (data: PageOffre) => {
        this.offres = data.offres;
        this.totalElements = data.totalElements;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  // Méthode pour effectuer la recherche instantanée
  handleSearchOffre() {
    this.currentAction = 'search';
    this.offreService.searchOffres(this.keyword, this.currentPage, this.pageSize).subscribe({
      next: (data: PageOffre) => {
        this.offres = data.offres;
        this.totalElements = data.totalElements;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  // Méthode appelée lors d'un changement de page
  handlePageEvent(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    if (this.currentAction === 'search') {
      this.handleSearchOffre(); // Rechercher avec pagination
    } else {
      this.handleGetPageOffre(); // Pagination simple
    }
  }

   // Méthode pour naviguer vers les détails d'une offre
   viewDetails(offreId: number) {
    this.router.navigate(['/detail-offre', offreId]);
  }
  // Méthode pour ouvrir le dialogue avec les détails de l'offre

  openDetailDialog(offre: Offre) {
    this.dialog.open(DetailOffreComponent, {
      width: '70%',
      height: '90vh',
      data: offre
    });
  }

  openEditDialog(offre: Offre) {
    const dialogRef = this.dialog.open(EditOffreDialogComponent, {
      width: '40%',
      height: '90vh',
      data: { ...offre } // Passe une copie de l'offre pour éviter des modifications directes
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Mise à jour de l'offre via le service
        this.offreService.updateOffre(result).subscribe(updatedOffre => {
          // Mettez à jour l'offre locale
          const index = this.offres.findIndex(o => o.offreId === updatedOffre.offreId);
          if (index !== -1) {
            this.offres[index] = updatedOffre;
          }
          console.log('Offre mise à jour avec succès');
        });
      }
    });
  }


     // Méthode pour supprimer une offre
  deleteOffre(offre: Offre) {
    if (confirm('Etes-vous sur de vouloir supprimer cette offre?')) {
      this.offreService.deleteOffre(offre.offreId).subscribe({
        next: () => {
          this.offres = this.offres.filter(o => o.offreId !== offre.offreId);
          console.log('Offre supprimée avec succès.');
        },
        error: (err) => {
          console.error('Erreur lors de la suppression de l\'offre:', err);
        }
      });
    }

  }
 // Méthode pour ouvrir le dialogue d'édition d'offre
 editOffre(offre: Offre) {
  const dialogRef = this.dialog.open(EditOffreDialogComponent, {
    width: '70%',
    data: { ...offre } // Passe une copie de l'offre au dialogue
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      // Mise à jour de l'offre via le service après modification
      this.offreService.updateOffre(result).subscribe(() => {
        this.handleGetPageOffre(); // Recharger les offres après mise à jour
        console.log('Offre mise à jour avec succès');
      });
    }
  });
}


}
