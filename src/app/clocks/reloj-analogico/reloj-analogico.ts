import { Component, computed, inject } from '@angular/core';
import { TimeService } from '../../core/services/time';

@Component({
  selector: 'app-reloj-analogico',
  imports: [],
  templateUrl: './reloj-analogico.html',
  styleUrl: './reloj-analogico.css',
})
export class RelojAnalogico {
  private time = inject(TimeService).currentTime;

  // Calculamos los grados de rotación para cada aguja
  secRotation = computed(() => this.time().getSeconds() * 6); // 360deg / 60s
  minRotation = computed(() => this.time().getMinutes() * 6 + this.time().getSeconds() * 0.1); 
  hourRotation = computed(() => (this.time().getHours() % 12) * 30 + this.time().getMinutes() * 0.5);
}