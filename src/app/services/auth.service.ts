import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService  {
  public isAuthenticated : boolean = false;
  public username : any;
  public roles : string[] = [];

  public users :any = {
    admin : {password : '1234', roles : ['ENTREPRISE','ADMIN', 'CANDIDAT']},
    entreprise : {password : 'entreprise', roles : ['CANDIDAT', 'ENTREPRISE']},
    candidat : {password : 'candidat', roles : [ 'CANDIDAT']},
  }

  constructor(private router : Router) {
   }

   public login(username:string, password:string): boolean{
    if(this.users[username] &&
      this.users[username]['password']==password){
      this.isAuthenticated = true;
      this.username = username;
      this.roles = this.users[username]['roles'];
      return true
    } else {
      return false;
    }
  }

  logout() {
    this.isAuthenticated = false;
    this.username = undefined;
    this.roles=[];
    this.router.navigateByUrl("/home")
  }
}
