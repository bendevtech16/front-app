import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { CandidatFormComponent } from '../candidat-form/candidat-form.component';
import { Candidat } from '../model/candidat.model';
import { CandidatService } from '../services/candidat.service';

@Component({
  selector: 'app-candidat',
  templateUrl: './candidat.component.html',
})
export class CandidatComponent implements OnInit {
  displayedColumns: string[] = ['nom', 'prenom', 'telephone', 'competencesTechniques', 'diplome', 'dateNaissance', 'competencesPersonnelles', 'actions'];
  dataSource = new MatTableDataSource<Candidat>();
  totalCandidats = 0;
  isLoading = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private candidatService: CandidatService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadCandidats();
  }

  loadCandidats(): void {
    this.isLoading = true;
    this.candidatService.consulterCandidats().subscribe({
      next: candidats => {
        this.dataSource.data = candidats;
        this.totalCandidats = candidats.length;
        this.dataSource.paginator = this.paginator;
        this.isLoading = false;
      },
      error: () => {
        alert('Erreur lors du chargement des candidats.');
        this.isLoading = false;
      }
    });
  }

  ajouterCandidat(): void {
    const dialogRef = this.dialog.open(CandidatFormComponent);
    dialogRef.afterClosed().subscribe((result: Candidat) => {
      if (result) {
        this.candidatService.enregistrerCandidat(result).subscribe(() => this.loadCandidats());
      }
    });
  }

  modifierCandidat(candidat: Candidat): void {
    const dialogRef = this.dialog.open(CandidatFormComponent, { data: candidat });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Candidat modifié :', result);
        this.loadCandidats(); // Rechargez la liste après modification
      }
    });
  }


  supprimerCandidat(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce candidat ?')) {
      this.candidatService.supprimerCandidat(id).subscribe(() => this.loadCandidats());
    }
  }
}
