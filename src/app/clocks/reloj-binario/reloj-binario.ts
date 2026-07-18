import { Component, computed, inject } from '@angular/core';
import { TimeService } from '../../core/services/time';

@Component({
  selector: 'app-reloj-binario',
  imports: [],
  templateUrl: './reloj-binario.html',
  styleUrl: './reloj-binario.css',
})
export class RelojBinario {
  private time = inject(TimeService).currentTime;

  // Señal computada que arma toda la matriz binaria
  binaryState = computed(() => {
    const t = this.time();
    const h = t.getHours().toString().padStart(2, '0');
    const m = t.getMinutes().toString().padStart(2, '0');
    const s = t.getSeconds().toString().padStart(2, '0');

    return {
      hours: {
        tens: this.getBits(Number(h[0]), 2), // Máximo 2 (hasta 23h)
        units: this.getBits(Number(h[1]), 4)
      },
      minutes: {
        tens: this.getBits(Number(m[0]), 3), // Máximo 5 (hasta 59m)
        units: this.getBits(Number(m[1]), 4)
      },
      seconds: {
        tens: this.getBits(Number(s[0]), 3), // Máximo 5 (hasta 59s)
        units: this.getBits(Number(s[1]), 4)
      }
    };
  });

  // Convierte un número en un array de booleanos según la cantidad de puntos
  private getBits(value: number, length: number): boolean[] {
    // Ej: 3 con length 4 -> '0011' -> [false, false, true, true]
    return value.toString(2).padStart(length, '0').split('').map(bit => bit === '1');
  }
}