import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { TimeService } from '../core/services/time';
import { RelojDigital } from '../clocks/reloj-digital/reloj-digital';
import { RelojAnalogico } from '../clocks/reloj-analogico/reloj-analogico';
import { RelojBinario } from '../clocks/reloj-binario/reloj-binario';
import { RelojAnillos } from '../clocks/reloj-anillos/reloj-anillos';
import { RelojEdificios } from '../clocks/reloj-edificios/reloj-edificios';
import { RelojArena } from '../clocks/reloj-arena/reloj-arena';
import { RelojAstros } from '../clocks/reloj-astros/reloj-astros';
import { RelojBacterias } from '../clocks/reloj-bacterias/reloj-bacterias';
import { RelojMar } from '../clocks/reloj-mar/reloj-mar';
import { RelojMetras} from '../clocks/reloj-metras/reloj-metras';

@Component({
  selector: 'app-panel',
  imports: [RelojDigital, RelojAnalogico, RelojBinario, RelojAnillos, RelojEdificios, RelojArena, RelojAstros, RelojBacterias, RelojMar, RelojMetras],
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
    { id: 'edificios', name: '5. Reloj Edificios' },
    { id: 'arena', name: '6. Reloj Arena' },
    { id: 'astros', name: '7. Reloj Astros' },
    { id: 'bacterias', name: '8. Reloj Bacterias' },
    { id: 'mar', name: '9. Reloj Mar' },
    { id: 'metras', name: '10. Reloj Metras' }
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