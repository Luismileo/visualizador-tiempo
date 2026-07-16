import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule], // Importamos el módulo para formularios reactivos
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  private router = inject(Router);

  // Señal para manejar mensajes de error en la interfaz
  errorMessage = signal<string | null>(null);

  // Declaramos el formulario reactivo con sus validaciones básicas
  loginForm = new FormGroup({
    username: new FormControl('', { 
      nonNullable: true, 
      validators: [Validators.required] 
    }),
    password: new FormControl('', { 
      nonNullable: true, 
      validators: [Validators.required, Validators.minLength(4)] 
    })
  });

  onSubmit() {
    if (this.loginForm.invalid) {
      this.errorMessage.set('Por favor, rellena todos los campos correctamente.');
      return;
    }

    // Extraemos los valores del formulario de forma segura
    const { username, password } = this.loginForm.getRawValue();

    // Validación simulada para la entrega del proyecto
    if (username === 'admin' && password === '1234') {
      this.errorMessage.set(null);
      
      // Guardamos el estado en el LocalStorage para el AuthGuard
      localStorage.setItem('sesion_activa', 'true');
      
      // Redirigimos al panel de los relojes
      this.router.navigate(['/relojes']);
    } else {
      this.errorMessage.set('Usuario o contraseña incorrectos.');
    }
  }
}