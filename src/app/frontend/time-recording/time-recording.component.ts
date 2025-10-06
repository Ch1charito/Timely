import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-time-recording',
  imports: [HeaderComponent, RouterModule],
  templateUrl: './time-recording.component.html',
  styleUrl: './time-recording.component.scss'
})
export class TimeRecordingComponent {

}
