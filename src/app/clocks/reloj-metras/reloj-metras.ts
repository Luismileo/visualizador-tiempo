import { Component, inject, effect, signal } from '@angular/core';
import { TimeService } from '../../core/services/time';

interface RampState {
  metras: number[];
  isFlushing: boolean;
}

@Component({
  selector: 'app-reloj-metras',
  standalone: true,
  templateUrl: './reloj-metras.html',
  styleUrl: './reloj-metras.css',
})
export class RelojMetras {
  private timeService = inject(TimeService);
  currentTime = this.timeService.currentTime;

  // Estados de cada rampa
  seconds = signal<RampState>({ metras: [], isFlushing: false });
  minutes = signal<RampState>({ metras: [], isFlushing: false });
  hours = signal<RampState>({ metras: [], isFlushing: false });

  constructor() {
    effect(() => {
      const t = this.currentTime();
      
      // Calculamos metras deseadas
      const secCount = Math.floor(t.getSeconds() / 5);
      const minCount = Math.floor(t.getMinutes() / 5);
      let hourCount = t.getHours() % 12;
      if (hourCount === 0) hourCount = 12;

      this.syncRamp(this.seconds, secCount, 5);
      this.syncRamp(this.minutes, minCount, 5);
      this.syncRamp(this.hours, hourCount, 1);
    }, { allowSignalWrites: true });
  }

  private syncRamp(rampSignal: any, targetCount: number, value: number) {
    const current = rampSignal();

    // Si hay menos metras requeridas que las actuales, significa que el ciclo reinició (se llena a tope y pasa a 0)
    if (targetCount < current.metras.length && !current.isFlushing) {
      // 1. Activamos la animación de vaciado
      rampSignal.set({ ...current, isFlushing: true });
      
      // 2. Esperamos a que las metras salgan rodando antes de resetear el arreglo
      setTimeout(() => {
        rampSignal.set({ metras: Array(targetCount).fill(value), isFlushing: false });
      }, 700); // Duración de la animación de salida
      
    } else if (!current.isFlushing && targetCount !== current.metras.length) {
      // Crecimiento normal (se agrega una metra nueva)
      rampSignal.set({ metras: Array(targetCount).fill(value), isFlushing: false });
    }
  }
}