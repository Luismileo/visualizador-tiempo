import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  private router = inject(Router);
  private authService = inject(AuthService); // Inyectamos el nuevo servicio

  isLoginMode = signal<boolean>(true); // Controla si estamos en Login o Registro
  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);

  loginForm = new FormGroup({
    username: new FormControl('', { 
      nonNullable: true, 
      // Agregamos límite máximo y mínimo
      validators: [Validators.required, Validators.minLength(4), Validators.maxLength(15)] 
    }),
    password: new FormControl('', { 
      nonNullable: true, 
      validators: [Validators.required, Validators.minLength(4)] 
    })
  });

  toggleMode() {
    this.isLoginMode.set(!this.isLoginMode());
    this.errorMessage.set(null);
    this.successMessage.set(null);
    this.loginForm.reset();
  }

  onSubmit() {
    const { username, password } = this.loginForm.getRawValue();
    
    // .trim() elimina los espacios al principio y al final ("  luis  " -> "luis")
    const cleanUsername = username.trim();

    // Validamos que no hayan enviado puros espacios o menos de 4 letras reales
    if (this.loginForm.invalid || cleanUsername.length < 4) {
      this.errorMessage.set('Datos inválidos. Usa entre 4 y 15 caracteres (sin espacios vacíos).');
      this.successMessage.set(null);
      return;
    }

    if (this.isLoginMode()) {
      // MODO INICIO DE SESIÓN
      if (this.authService.loginUser(cleanUsername, password)) {
        this.errorMessage.set(null);
        localStorage.setItem('sesion_activa', 'true');
        this.router.navigate(['/relojes']);
      } else {
        this.errorMessage.set('Usuario o contraseña incorrectos.');
      }
    } else {
      // MODO REGISTRO
      if (this.authService.registerUser(cleanUsername, password)) {
        this.successMessage.set('¡Registro exitoso! Ahora puedes iniciar sesión.');
        this.errorMessage.set(null);
        this.isLoginMode.set(true); // Lo devolvemos al modo login
        this.loginForm.reset();
      } else {
        this.errorMessage.set('El usuario ya existe. Intenta con otro nombre.');
        this.successMessage.set(null);
      }
    }
  }
}