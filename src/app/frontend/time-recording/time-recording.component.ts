import { Component, inject } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-time-recording',
  imports: [HeaderComponent, RouterModule, CommonModule],
  templateUrl: './time-recording.component.html',
  styleUrl: './time-recording.component.scss'
})
export class TimeRecordingComponent {

firebaseService = inject(FirebaseService);
hours: number = 0;
minutes: number = 0;
seconds: number = 0;
intervalId: any;  
isRunning: boolean = false;
workSessions: { date: string; worktime: string }[] = [];

get formattedTime(): string {
  const h = this.hours.toString().padStart(2, '0');
  const m = this.minutes.toString().padStart(2, '0');
  const s = this.seconds.toString().padStart(2, '0');
  return `${h}:${m}:${s}`;
}

startTimer(): void {
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

stopTimer(): void {
  if (!this.isRunning) return;
  clearInterval(this.intervalId);
  this.isRunning = false;
}

endWork(): void {
  if (this.isRunning) {
    clearInterval(this.intervalId);
    this.isRunning = false;
  }
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('de-DE');
  const workSession = {
    date: formattedDate,
    worktime: this.formattedTime
  };
  this.firebaseService.addWorksessionToDatabase(workSession)
  this.hours = 0;
  this.minutes = 0;
  this.seconds = 0;
}

}
