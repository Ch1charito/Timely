import { Component, inject } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FirebaseService } from '../../services/firebase.service';
import { TimerService } from '../../services/timer.service';

@Component({
  selector: 'app-time-recording',
  imports: [HeaderComponent, RouterModule, CommonModule],
  templateUrl: './time-recording.component.html',
  styleUrl: './time-recording.component.scss'
})
export class TimeRecordingComponent {
timerService = inject(TimerService);
firebaseService = inject(FirebaseService);
workSessions: { date: string; worktime: string }[] = [];

  startTimer(): void {
    this.timerService.start();
  }

  stopTimer(): void {
    this.timerService.stop();
  }

  endWork(): void {
    this.timerService.stop();
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('de-DE');
    const workSession = {
      date: formattedDate,
      worktime: this.timerService.formattedTime
    };
    this.firebaseService.addWorksessionToDatabase(workSession);
    this.timerService.reset();
  }
}
