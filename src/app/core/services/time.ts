import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeService {
  readonly currentTime = signal(new Date());
  
  private timerId: any;
  // Guardamos el desfase en milisegundos para el simulador
  private offsetMs = 0;

  constructor() {
    this.startClock();
  }

  private startClock() {
    this.timerId = setInterval(() => {
      const realNow = new Date();
      // Aplicamos el desfase matemático a la hora real
      this.currentTime.set(new Date(realNow.getTime() + this.offsetMs));
    }, 1000); 
  }

  stopClock() {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
  }

  // --- MÉTODOS DEL SIMULADOR PARA EL PROFESOR ---

  addMinutes(minutes: number) {
    this.offsetMs += minutes * 60 * 1000;
    this.forceUpdate();
  }

  addHours(hours: number) {
    this.offsetMs += hours * 60 * 60 * 1000;
    this.forceUpdate();
  }

  resetToRealTime() {
    this.offsetMs = 0;
    this.forceUpdate();
  }

  // Fuerza una actualización visual inmediata sin esperar al siguiente segundo
  private forceUpdate() {
    const realNow = new Date();
    this.currentTime.set(new Date(realNow.getTime() + this.offsetMs));
  }
}