import { Injectable, signal, EffectRef, effect } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeService {
  // Creamos una señal reactiva que guardará el objeto Date actual
  readonly currentTime = signal(new Date());

  private timerId: any;

  constructor() {
    this.startClock();
  }

  // Iniciamos el temporizador maestro (un único setInterval para toda la app)
  private startClock() {
    this.timerId = setInterval(() => {
      this.currentTime.set(new Date());
    }, 1000); // Se actualiza exactamente cada 1 segundo
  }

  // Método de limpieza por si el servicio se destruye
  stopClock() {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
  }
}