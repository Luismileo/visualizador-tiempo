import { Component, computed, inject } from '@angular/core';
import { TimeService } from '../../core/services/time';

@Component({
  selector: 'app-reloj-edificios',
  imports: [],
  templateUrl: './reloj-edificios.html',
  styleUrl: './reloj-edificios.css'
})
export class RelojEdificios {
  private timeService = inject(TimeService);
  currentTime = this.timeService.currentTime;

  // Secuencias aleatorias fijas generadas al inicializar el componente
  private hoursSequence = this.generateRandomSequence(24);
  private minutesSequence = this.generateRandomSequence(60);
  private secondsSequence = this.generateRandomSequence(60);

  // Computed que devuelve el estado de cada ventana (true = encendida, false = apagada)
  windows = computed(() => {
    const date = this.currentTime();
    const h = date.getHours(); // 0 a 23 (24 ventanas)
    const m = date.getMinutes(); // 0 a 59 (60 ventanas)
    const s = date.getSeconds(); // 0 a 59 (60 ventanas)

    return {
      hours: this.getWindowState(h, 24, this.hoursSequence),
      minutes: this.getWindowState(m, 60, this.minutesSequence),
      seconds: this.getWindowState(s, 60, this.secondsSequence)
    };
  });

  // Algoritmo Fisher-Yates para desordenar un arreglo de números (0 hasta length-1)
  private generateRandomSequence(length: number): number[] {
    const arr = Array.from({ length }, (_, i) => i);
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // Activa la cantidad exacta de ventanas según la hora/min/seg, basándose en la secuencia aleatoria
  private getWindowState(count: number, total: number, sequence: number[]): boolean[] {
    const state = new Array(total).fill(false);
    for (let i = 0; i < count; i++) {
      state[sequence[i]] = true; // Enciende las primeras 'count' posiciones de la lista aleatoria
    }
    return state;
  }
}