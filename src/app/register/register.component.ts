import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user = {
    id: "",
    name: "",
    email: "",
  };

  onSubmit() {
    throw new Error('Method not implemented.');
  }
}
