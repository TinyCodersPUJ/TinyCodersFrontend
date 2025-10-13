import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { SupabaseService } from '../services/supabase.service';
@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class SignupComponent {
  registerForm!: FormGroup;
  constructor(private formBuilder: FormBuilder, private auth: SupabaseService) {
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
        })
        .catch((error) => {
          console.error('Error registering user:', error);
        });
    }
  }
}
