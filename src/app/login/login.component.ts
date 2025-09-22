import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  successMessage: string | null = null;  // Variable para el mensaje de éxito
  errorMessage: string | null = null;    // Variable para el mensaje de error

  constructor(private router: Router) {}

  onSubmit() {
    
    console.log("Login: " + document);
    
    this.router.navigate([`/bienvenida`]);  // Redirigir a la URL construida
  }
}
