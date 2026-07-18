import { Component, inject, signal, effect, OnDestroy, NgZone, OnInit, ElementRef, computed } from '@angular/core';
import { TimeService } from '../../core/services/time';

interface Fish {
  id: string;
  type: 'big' | 'small';
  x: number;
  y: number;
  vx: number;
  vy: number;
  state: 'entering' | 'swimming' | 'exiting';
  exitTargetX?: number;
}

@Component({
  selector: 'app-reloj-mar',
  standalone: true,
  templateUrl: './reloj-mar.html',
  styleUrl: './reloj-mar.css',
})
export class RelojMar implements OnInit, OnDestroy {
  private timeService = inject(TimeService);
  private ngZone = inject(NgZone);
  private elRef = inject(ElementRef);
  
  currentTime = this.timeService.currentTime;
  private animationFrameId?: number;

  fishes = signal<Fish[]>([]);

  isLighthouseOn = computed(() => {
    return this.currentTime().getSeconds() % 2 === 0;
  });

  constructor() {
    effect(() => {
      const t = this.currentTime();
      
      // REGRESAMOS A 12 HORAS: Evitamos sobrecargar el mar (si es 0 o 12, se muestran 12 peces)
      const hours = t.getHours() % 12 === 0 ? 12 : t.getHours() % 12;
      const minutes = t.getMinutes();
      
      this.syncPopulation(hours, minutes);
    }, { allowSignalWrites: true });
  }

  ngOnInit() {
    this.ngZone.runOutsideAngular(() => {
      this.startOceanLoop();
    });
  }

  ngOnDestroy() {
    if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
  }

  private syncPopulation(hours: number, minutes: number) {
    this.fishes.update(current => {
      const nextState = [...current];
      this.adjustFishType(nextState, 'big', hours);
      this.adjustFishType(nextState, 'small', minutes);
      return nextState;
    });
  }

  private adjustFishType(fleet: Fish[], type: 'big' | 'small', targetCount: number) {
    const activeFish = fleet.filter(f => f.type === type && f.state !== 'exiting');
    
    if (targetCount > activeFish.length) {
      const diff = targetCount - activeFish.length;
      for (let i = 0; i < diff; i++) fleet.push(this.spawnFish(type));
    } else if (targetCount < activeFish.length) {
      const diff = activeFish.length - targetCount;
      const fishToLeave = activeFish.slice(0, diff);
      fishToLeave.forEach(f => {
        f.state = 'exiting';
        f.exitTargetX = f.vx > 0 ? 2500 : -500; 
      });
    }
  }

  private spawnFish(type: 'big' | 'small'): Fish {
    const width = this.elRef.nativeElement.clientWidth || 1000;
    const height = this.elRef.nativeElement.clientHeight || 600;
    
    const isLeft = Math.random() > 0.5;
    const startX = isLeft ? -150 : width + 150;
    
    // Calculamos la altura del océano basado en el flex de CSS (proporción 1 de un total de 2.8)
    const oceanHeight = height * (1.0 / 2.8);
    
    // Como los peces están dentro de .ocean, Y=0 ya es la superficie del mar.
    // Calculamos su profundidad dentro de este contenedor.
    const startY = Math.random() * (oceanHeight - 60) + 20; 
    
    const speed = type === 'big' ? (Math.random() * 0.5 + 0.5) : (Math.random() * 1.5 + 1);
    
    return {
      id: Math.random().toString(36).substring(2, 9),
      type,
      x: startX,
      y: startY,
      vx: isLeft ? speed : -speed,
      vy: 0,
      state: 'entering'
    };
  }

  private startOceanLoop() {
    let time = 0;
    const loop = () => {
      time += 0.05;
      this.fishes.update(current => {
        const width = this.elRef.nativeElement.clientWidth || 1000;
        let state = [...current];

        for (let i = state.length - 1; i >= 0; i--) {
          const f = state[i];

          f.y += Math.sin(time + f.x * 0.01) * 0.3;
          f.x += f.vx;

          if (f.state !== 'exiting') {
            if (f.x < 50 && f.vx < 0) f.vx *= -1; 
            if (f.x > width - 220 && f.vx > 0) f.vx *= -1; 
          } else {
            if ((f.vx > 0 && f.x > (f.exitTargetX || width + 200)) || 
                (f.vx < 0 && f.x < (f.exitTargetX || -200))) {
              state.splice(i, 1);
            }
          }
        }
        return state;
      });
      this.animationFrameId = requestAnimationFrame(loop);
    };
    this.animationFrameId = requestAnimationFrame(loop);
  }
}