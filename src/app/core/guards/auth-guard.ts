import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  // 1. Revisamos si existe la sesión en el LocalStorage
  const isLoggedIn = localStorage.getItem('sesion_activa') === 'true';

  if (isLoggedIn) {
    // Si está logueado, lo dejamos pasar (true)
    return true;
  } else {
    // Si no está logueado, lo rebotamos al login y bloqueamos el paso (false)
    router.navigate(['/login']);
    return false;
  }
};