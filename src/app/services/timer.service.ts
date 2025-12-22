import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  hours = 0;
  minutes = 0;
  seconds = 0;
  isRunning = false;
  private intervalId: any;

  get formattedTime(): string {
    const h = this.hours.toString().padStart(2, '0');
    const m = this.minutes.toString().padStart(2, '0');
    const s = this.seconds.toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  }

  start(): void {
    if (this.isRunning) return;
    this.isRunning = true;
    this.intervalId = setInterval(() => {
      this.seconds++;
      if (this.seconds === 60) {
        this.seconds = 0;
        this.minutes++;
      }
      if (this.minutes === 60) {
        this.minutes = 0;
        this.hours++;
      }
    }, 1000);
  }

  stop(): void {
    if (!this.isRunning) return;
    clearInterval(this.intervalId);
    this.isRunning = false;
  }

  reset(): void {
    this.stop();
    this.hours = 0;
    this.minutes = 0;
    this.seconds = 0;
  }
  
}
