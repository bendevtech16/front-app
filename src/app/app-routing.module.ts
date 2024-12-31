import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {FooterComponent} from "./footer/footer.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {AdminComponent} from "./admin/admin.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {CandidatureComponent} from "./candidature/candidature.component";
import {AdministrationComponent} from "./administration/administration.component";
import {AuthGuard} from "./guards/auth.guard";
import {CandidatComponent} from "./candidat/candidat.component";
import { OffreComponent } from './offre/offre.component';
import {FormComponent} from "./form/form.component";
import { DetailOffreComponent } from './detail-offre/detail-offre.component';

const routes: Routes = [{path: "", component: HomeComponent},
  {path:"home", component: HomeComponent},
  {path: "footer", component: FooterComponent},
  {path: "login", component: LoginComponent},
  {path:"register", component: RegisterComponent},
  { path: 'detail-offre/:id', component: DetailOffreComponent },
  { path: '', redirectTo: '/offres', pathMatch: 'full' },
  {path:"admin", component:AdminComponent,


     //canActivate : [AuthGuard],
    children:[
      {path:"home", component: HomeComponent},
      {path:"dashboard", component: DashboardComponent},
      {path:"candidat", component:CandidatComponent},
      {path:"candidature", component: CandidatureComponent},
      {path:"administration", component: AdministrationComponent},
      {path:"view", component:OffreComponent},
      {path:"form", component:FormComponent},
      {path:"", component:HomeComponent},
     

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
