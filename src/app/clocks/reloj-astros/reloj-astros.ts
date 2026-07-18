import { Component, computed, inject } from '@angular/core';
import { TimeService } from '../../core/services/time';

@Component({
  selector: 'app-reloj-astros',
  imports: [],
  templateUrl: './reloj-astros.html',
  styleUrl: './reloj-astros.css',
})
export class RelojAstros {
  private timeService = inject(TimeService);
  currentTime = this.timeService.currentTime;

  astroState = computed(() => {
    const date = this.currentTime();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    // 1. Obtener tiempo local en milisegundos ajustado por el offset de zona horaria
    const localTimeMs = date.getTime() - (date.getTimezoneOffset() * 60000);
    const totalHours = localTimeMs / (1000 * 60 * 60);

    // 2. Rotación continua basada en horas locales (0 a 24)
    // Usamos el totalHours local para que el giro no se reinicie a 0, sino que sea un ciclo infinito
    const rotation = (totalHours - 12) * 15; 

    // 3. Fase visual (usando horas locales)
    const totalDecimalHours = hours + (minutes / 60) + (seconds / 3600);
    let phase = 'night';
    if (totalDecimalHours >= 5.5 && totalDecimalHours < 7.5) {
      phase = 'dawn'; 
    } else if (totalDecimalHours >= 7.5 && totalDecimalHours < 17.5) {
      phase = 'day'; 
    } else if (totalDecimalHours >= 17.5 && totalDecimalHours < 19.5) {
      phase = 'dusk'; 
    }

    const displayHours = hours % 12 === 0 ? 12 : hours % 12;
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const timeLabel = `${displayHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${ampm}`;

    return {
      rotation,
      phase,
      timeLabel
    };
  });
}