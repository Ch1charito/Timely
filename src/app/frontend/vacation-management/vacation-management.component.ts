import { Component, inject } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { RouterModule } from '@angular/router';
import { VacationService } from '../../services/vacation.service';
import { Vacation } from '../../interfaces/vacation.interface';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-vacation-management',
  imports: [HeaderComponent, RouterModule, FormsModule],
  templateUrl: './vacation-management.component.html',
  styleUrl: './vacation-management.component.scss'
})
export class VacationManagementComponent {
  vacationService = inject(VacationService);
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
    this.vacationService.add(this.vacation);
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

  get daysAlreadyTaken(): number {
    return this.vacationService.getDaysAlreadyTaken();
  }

  get remainingDays(): number {
    const total = 27;
    return total - this.daysAlreadyTaken;
  }
}
