import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { TimeService } from '../core/services/time';
import { RelojDigital } from '../clocks/reloj-digital/reloj-digital';
import { RelojAnalogico } from '../clocks/reloj-analogico/reloj-analogico';
import { RelojBinario } from '../clocks/reloj-binario/reloj-binario';
import { RelojAnillos } from '../clocks/reloj-anillos/reloj-anillos';

@Component({
  selector: 'app-panel',
  imports: [RelojDigital, RelojAnalogico, RelojBinario, RelojAnillos],
  templateUrl: './panel.html',
  styleUrl: './panel.css'
})
export class PanelComponent {
  private router = inject(Router);
  private timeService = inject(TimeService);

  selectedClock = signal<string>('digital');

  clockList = [
    { id: 'digital', name: '1. Reloj Digital' },
    { id: 'analogico', name: '2. Reloj Analógico' },
    { id: 'anillos', name: '3. Reloj de Anillos' },
    { id: 'binario', name: '4. Reloj Binario' },
    { id: 'reloj5', name: '5. Vacío' },
    { id: 'reloj6', name: '6. Vacío' },
    { id: 'reloj7', name: '7. Vacío' },
    { id: 'reloj8', name: '8. Vacío' },
    { id: 'reloj9', name: '9. Vacío' },
    { id: 'reloj10', name: '10. Vacío' }
  ];

  addHour() {
    this.timeService.addHours(1);
  }

  addMinute() {
    this.timeService.addMinutes(1);
  }

  resetTime() {
    this.timeService.resetToRealTime();
  }

  logout() {
    localStorage.removeItem('sesion_activa');
    this.router.navigate(['/login']);
  }
}