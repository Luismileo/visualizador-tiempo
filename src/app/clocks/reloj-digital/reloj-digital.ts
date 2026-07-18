import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necesario para el DatePipe
import { TimeService } from '../../core/services/time'; 

@Component({
  selector: 'app-reloj-digital',
  imports: [CommonModule],
  templateUrl: './reloj-digital.html',
  styleUrl: './reloj-digital.css',
})
export class RelojDigital {
  // Inyectamos el servicio para tener acceso a la señal
  timeService = inject(TimeService);
}