import { Component, inject } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { RouterModule } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';
import { Vacation } from '../../interfaces/vacation.interface';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-vacation-management',
  imports: [HeaderComponent, RouterModule, FormsModule],
  templateUrl: './vacation-management.component.html',
  styleUrl: './vacation-management.component.scss'
})
export class VacationManagementComponent {
  firebaseService = inject(FirebaseService);
  vacation: Vacation = {
    vacStart: '',
    vacEnd: '',
    daysNeeded: 1,
    reason: '',
    approved: false
  }

  submitVacation(form: NgForm) {
    if (!form.valid) {
      console.warn('Form invalid!');
    return;
    }
    this.vacation.vacStart = this.vacation.vacStart;  
    this.vacation.vacEnd = this.vacation.vacEnd;
    this.vacation.daysNeeded = this.vacation.daysNeeded;
    this.vacation.reason = this.vacation.reason;
    this.vacation.approved = false;
    this.firebaseService.addVacationToDatabase(this.vacation);
    form.resetForm();
    this.clearInputFields();
  }

  clearInputFields() {
    this.vacation.vacStart = '';
    this.vacation.vacEnd = '';
    this.vacation.daysNeeded = 1;
    this.vacation.reason = '';
    this.vacation.approved = false;
  }

}
