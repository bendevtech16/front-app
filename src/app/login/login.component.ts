import {ChangeDetectionStrategy, Component, OnInit, signal} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit  {
  public loginForm! : FormGroup;
  public message!:boolean;
  username: string = '';
  password: string = '';
  readonly email = new FormControl('', [Validators.required, Validators.email]);

  constructor(private fb : FormBuilder,
              private authService : AuthService,
              private router : Router) {
  }
  ngOnInit() {
    this.loginForm= this.fb.group({
      username : this.fb.control('', [Validators.required]),
      password : this.fb.control('', Validators.required)
    });
  }

  login(){
    let username = this.loginForm.value.username;
    let password = this.loginForm.value.password;
    let auth = this.authService.login(username, password);
    if(auth){
      this.router.navigateByUrl("/admin")
    }
    else alert("Login ou password incorrect...")
  }
  Onlogin(){
    let username = this.loginForm.value.username;
    let password = this.loginForm.value.password;
    let auth = this.authService.login(username, password);
    if(auth==true){
      this.router.navigateByUrl("/admin")

    }
    else
    alert("votre login ou mot de passe est errone!!!")
 }

 
  errorMessage = signal('');


  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage.set('You must enter a value');
    } else if (this.email.hasError('email')) {
      this.errorMessage.set('Not a valid email');
    } else {
      this.errorMessage.set('');
    }
  }
}
