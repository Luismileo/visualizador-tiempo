import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  // Ruta pública: Cualquiera puede entrar al login
  { path: 'login', component: LoginComponent },

  // Ruta protegida: Solo entra si el authGuard retorna 'true'
  { 
    path: 'relojes', 
    loadComponent: () => import('./app').then(m => m.AppComponent), 
    canActivate: [authGuard] 
  },

  // Ruta por defecto: Si entran a la raíz, los manda directo al login
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  
  // Comodín: Si escriben cualquier locura en la URL, los manda al login
  { path: '**', redirectTo: 'login' }
];