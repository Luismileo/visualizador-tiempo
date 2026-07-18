import { Component, inject, signal, effect, OnDestroy, NgZone, OnInit, ElementRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TimeService } from '../../core/services/time';

interface Bacteria {
  id: string;
  type: 'hour' | 'minute' | 'second';
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  exploding: boolean;
  mitosis: boolean;
}

@Component({
  selector: 'app-reloj-bacterias',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './reloj-bacterias.html',
  styleUrl: './reloj-bacterias.css',
})
export class RelojBacterias implements OnInit, OnDestroy {
  private timeService = inject(TimeService);
  private ngZone = inject(NgZone);
  private elRef = inject(ElementRef);
  
  currentTime = this.timeService.currentTime;
  private animationFrameId?: number;

  bacterias = signal<Bacteria[]>([]);

  // Tamaños reducidos para que tengan espacio vital en la pantalla
  private radiusMap = { hour: 28, minute: 18, second: 10 };

  constructor() {
    effect(() => {
      const t = this.currentTime();
      this.syncPopulation(t.getHours(), t.getMinutes(), t.getSeconds());
    }, { allowSignalWrites: true });
  }

  ngOnInit() {
    this.ngZone.runOutsideAngular(() => {
      this.startPhysicsLoop();
    });
  }

  ngOnDestroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  private syncPopulation(hours: number, minutes: number, seconds: number) {
    const displayHours = hours % 12 === 0 ? 12 : hours % 12;
    
    this.bacterias.update(current => {
      let nextState = [...current];

      const types = [
        { type: 'second', val: seconds },
        { type: 'minute', val: minutes },
        { type: 'hour', val: displayHours }
      ];

      for (let info of types) {
        const type = info.type as 'hour' | 'minute' | 'second';
        const aliveOfType = nextState.filter(b => b.type === type && !b.exploding);

        if (info.val === 0 && aliveOfType.length > 0 && type === 'second') {
          nextState.forEach(b => { if (b.type === type) b.exploding = true; });
          this.scheduleCleanup();
        } else if (info.val > aliveOfType.length) {
          const diff = info.val - aliveOfType.length;
          for (let i = 0; i < diff; i++) {
            const alive = nextState.filter(b => b.type === type && !b.exploding);
            // Elegimos un padre completamente al azar de los que ya existen
            const parent = alive.length > 0 ? alive[Math.floor(Math.random() * alive.length)] : undefined;
            nextState.push(this.spawnBacteria(type, parent));
          }
        } else if (info.val < aliveOfType.length) {
          nextState = nextState.filter(b => b.type !== type || b.exploding);
          for (let i = 0; i < info.val; i++) nextState.push(this.spawnBacteria(type));
        }
      }

      return nextState;
    });
  }

  private spawnBacteria(type: 'hour' | 'minute' | 'second', parent?: Bacteria): Bacteria {
    const width = this.elRef.nativeElement.clientWidth || 800;
    const height = this.elRef.nativeElement.clientHeight || 600;

    // Si no hay padre, nace en un lugar 100% aleatorio de la pantalla
    const startX = parent ? parent.x : Math.random() * (width - 100) + 50;
    const startY = parent ? parent.y : Math.random() * (height - 100) + 50;

    let vx = (Math.random() - 0.5) * 3;
    let vy = (Math.random() - 0.5) * 3;

    if (parent) {
        vx = parent.vx + (Math.random() - 0.5) * 4;
        vy = parent.vy + (Math.random() - 0.5) * 4;
    }

    return {
      id: Math.random().toString(36).substring(2, 9),
      type,
      x: startX,
      y: startY,
      vx,
      vy,
      radius: this.radiusMap[type],
      exploding: false,
      mitosis: true
    };
  }

  private scheduleCleanup() {
    setTimeout(() => {
      this.bacterias.update(current => current.filter(b => !b.exploding));
    }, 600);
  }

  private startPhysicsLoop() {
    const loop = () => {
      this.bacterias.update(current => {
        const width = this.elRef.nativeElement.clientWidth;
        const height = this.elRef.nativeElement.clientHeight;
        if (!width || !height) return current;

        const state = [...current];

        for (let i = 0; i < state.length; i++) {
          const b = state[i];
          if (b.exploding) continue;

          b.vx += (Math.random() - 0.5) * 0.1;
          b.vy += (Math.random() - 0.5) * 0.1;

          const maxSpeed = 1.2; 
          const speed = Math.sqrt(b.vx * b.vx + b.vy * b.vy);
          if (speed > maxSpeed) {
            b.vx = (b.vx / speed) * maxSpeed;
            b.vy = (b.vy / speed) * maxSpeed;
          }

          b.x += b.vx;
          b.y += b.vy;

          if (b.x - b.radius < 0) { b.x = b.radius; b.vx *= -0.8; }
          if (b.x + b.radius > width) { b.x = width - b.radius; b.vx *= -0.8; }
          if (b.y - b.radius < 0) { b.y = b.radius; b.vy *= -0.8; }
          if (b.y + b.radius > height) { b.y = height - b.radius; b.vy *= -0.8; }

          // Optimización: Usamos distancia al cuadrado para evitar el Math.sqrt en cada frame
          for (let j = i + 1; j < state.length; j++) {
            const b2 = state[j];
            if (b2.exploding) continue;

            const dx = b2.x - b.x;
            const dy = b2.y - b.y;
            const distSq = dx * dx + dy * dy;
            const minDistance = b.radius + b2.radius;

            if (distSq < minDistance * minDistance) {
              const distance = Math.sqrt(distSq) || 1;
              const overlap = minDistance - distance;
              
              const pushX = (dx / distance) * overlap * 0.05;
              const pushY = (dy / distance) * overlap * 0.05;

              b.vx -= pushX;
              b.vy -= pushY;
              b2.vx += pushX;
              b2.vy += pushY;
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