import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { SupabaseService } from '../services/supabase.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class SignupComponent {
  registerForm!: FormGroup;
  showSuccessAlert = false; // Variable para controlar la visualización del mensaje de éxito
  errorMessage: string | null = null; // Variable para el mensaje de error

  constructor(
    private formBuilder: FormBuilder,
    private auth: SupabaseService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { email, password } = this.registerForm.value;
      this.auth
        .signUp(email, password)
        .then((response) => {
          console.log('User registered successfully:', response);
          this.showSuccessAlert = true; // Mostrar mensaje de éxito
          this.errorMessage = null; // Limpiar mensaje de error
        })
        .catch((error) => {
          console.error('Error registering user:', error);
          this.errorMessage =
            'Error al crear la cuenta, por favor intenta nuevamente.'; // Mostrar mensaje de error
          this.showSuccessAlert = false; // Asegurarse de que el mensaje de éxito no se muestre
        });
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
