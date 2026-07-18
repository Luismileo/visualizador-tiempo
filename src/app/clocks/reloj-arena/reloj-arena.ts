import { Component, computed, inject } from '@angular/core';
import { TimeService } from '../../core/services/time';

@Component({
  selector: 'app-reloj-arena',
  imports: [],
  templateUrl: './reloj-arena.html',
  styleUrl: './reloj-arena.css',
})
export class RelojArena {
  private timeService = inject(TimeService);
  currentTime = this.timeService.currentTime;

  clockState = computed(() => {
    const date = this.currentTime();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const isNightTime = hours < 6 || hours >= 18;
    const hourInCycle = (hours >= 6 && hours < 18) ? (hours - 6) : (hours >= 18 ? hours - 18 : hours + 6);

    const elapsedSeconds = (hourInCycle * 3600) + (minutes * 60) + seconds;
    const progressPercentage = (elapsedSeconds / 43200) * 100;

    const displayHours = hours % 12 === 0 ? 12 : hours % 12;
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const digitalLabel = `${displayHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${ampm}`;

    // LA ILUSIÓN ÓPTICA: Intercambiamos qué bulbo se vacía y cuál se llena según el ciclo
    const topSandHeight = isNightTime ? progressPercentage : (100 - progressPercentage);
    const bottomSandHeight = isNightTime ? (100 - progressPercentage) : progressPercentage;

    return {
      topSand: topSandHeight,
      bottomSand: bottomSandHeight,
      isNight: isNightTime,
      isFalling: progressPercentage < 100,
      label: digitalLabel
    };
  });
}