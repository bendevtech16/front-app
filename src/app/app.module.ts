import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Angular Material modules
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// Composants personnalisés
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminComponent } from './admin/admin.component';
import { AdministrationComponent } from './administration/administration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { CandidatComponent } from './candidat/candidat.component';
import { CandidatureComponent } from './candidature/candidature.component';
import { SuccessModalComponent } from './success-modal/success-modal.component';
import { OffreComponent } from './offre/offre.component';
import { FormComponent } from './form/form.component';
import { DetailOffreComponent } from './detail-offre/detail-offre.component';
import { EditOffreDialogComponent } from './edit-offre-dialog/edit-offre-dialog.component';
import { CandidatFormComponent } from './candidat-form/candidat-form.component';

// Services et guards
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { AuthorizationGuard } from './guards/authorization.guard';
import { OffreService } from './services/offre.service';
import { CandidatService } from './services/candidat.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    AdminComponent,
    AdministrationComponent,
    DashboardComponent,
    ProfileComponent,
    CandidatComponent,
    CandidatureComponent,
    SuccessModalComponent,
    OffreComponent,
    FormComponent,
    DetailOffreComponent,
    EditOffreDialogComponent,
    CandidatFormComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, // Nécessaire pour Angular Material
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    // Modules Angular Material
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatSelectModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    AuthService,
    AuthGuard,
    AuthorizationGuard,
    OffreService,
    CandidatService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
