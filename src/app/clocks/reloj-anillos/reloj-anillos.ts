import { Component, computed, inject, signal, effect, OnDestroy } from '@angular/core';
import { TimeService } from '../../core/services/time';

@Component({
  selector: 'app-reloj-anillos',
  imports: [],
  templateUrl: './reloj-anillos.html',
  styleUrl: './reloj-anillos.css'
})
export class RelojAnillos implements OnDestroy {
  private timeService = inject(TimeService);

  // Señal local de alta frecuencia para el renderizado continuo
  smoothTime = signal<Date>(new Date());

  private animationFrameId?: number;
  private timeDrift = 0; // Desfase en milisegundos provocado por el simulador

  // Medidas matemáticas de las circunferencias (2 * PI * Radio)
  readonly strokeOuter = 2 * Math.PI * 120; // ~753.98 (Segundos)
  readonly strokeMiddle = 2 * Math.PI * 90;  // ~565.49 (Minutos)
  readonly strokeInner = 2 * Math.PI * 60;   // ~376.99 (Horas)

  constructor() {
    // Sincronizamos el desfase inmediatamente cuando el usuario altera el tiempo en el simulador
    effect(() => {
      const simulated = this.timeService.currentTime();
      const real = new Date();
      this.timeDrift = simulated.getTime() - real.getTime();
    });

    // Arrancamos el ciclo de actualización de alta velocidad
    this.startSmoothLoop();
  }

  private startSmoothLoop() {
    const loop = () => {
      // Obtenemos la hora simulada exacta sumando el desfase al reloj de alta precisión del sistema
      const exactSimulatedTime = new Date(Date.now() + this.timeDrift);
      this.smoothTime.set(exactSimulatedTime);
      this.animationFrameId = requestAnimationFrame(loop);
    };
    this.animationFrameId = requestAnimationFrame(loop);
  }

  ngOnDestroy() {
    // Apagamos el motor de renderizado al salir del componente para liberar recursos
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  // Cálculo en tiempo real de los offsets (se ejecuta 60 veces por segundo de forma ultra-eficiente)
  offsets = computed(() => {
    const date = this.smoothTime();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const ms = date.getMilliseconds();

    // 1. Segundos (Rojo) -> Sumamos los milisegundos para un barrido analógico perfecto
    const secProgress = (seconds + ms / 1000) / 60;
    const secOffset = this.strokeOuter * (1 - secProgress);

    // 2. Minutos (Verde) -> Fluye dinámicamente según el progreso exacto del anillo de segundos
    const minProgress = (minutes + secProgress) / 60;
    const minOffset = this.strokeMiddle * (1 - minProgress);

    // 3. Horas (Azul) -> Fluye dinámicamente según el progreso de los minutos (escala de 24 horas)
    const hourProgress = (hours + minProgress) / 24;
    const hourOffset = this.strokeInner * (1 - hourProgress);

    return {
      seconds: secOffset,
      minutes: minOffset,
      hours: hourOffset
    };
  });
}