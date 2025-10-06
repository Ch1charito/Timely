import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-vacation-management',
  imports: [HeaderComponent, RouterModule],
  templateUrl: './vacation-management.component.html',
  styleUrl: './vacation-management.component.scss'
})
export class VacationManagementComponent {

}
