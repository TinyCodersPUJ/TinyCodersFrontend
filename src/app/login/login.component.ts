import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { SupabaseService } from '../services/supabase.service';
@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class LoginComponent {
  loginForm!: FormGroup;

  successMessage: string | null = null; // Variable para el mensaje de éxito
  errorMessage: string | null = null; // Variable para el mensaje de error

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private auth: SupabaseService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit() {
    // console.log('Login: ' + document);
    this.auth
      .signIn(this.loginForm.value.email, this.loginForm.value.passwordj)
      .then((response) => {
        console.log('User logged in successfully:', response);
        this.router.navigate([`/bienvenida`]); // Redirigir a la URL construida
      })
      .catch((error) => {
        console.error('Error logging in:', error);
      });
  }

  navigateToSignUp(event: Event) {
    event.preventDefault(); // Evitar el comportamiento por defecto del botón
    this.router.navigate(['/signup']);
  }
}
