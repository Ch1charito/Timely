import { Injectable, inject, OnDestroy } from '@angular/core';
import { Firestore, addDoc, collection, onSnapshot } from '@angular/fire/firestore';
import { Vacation } from '../interfaces/vacation.interface';

@Injectable({ providedIn: 'root' })
export class VacationService implements OnDestroy {
  private firestore = inject(Firestore);
  vacations: Vacation[] = [];
  private unsubscribe: () => void;

  constructor() {
    this.unsubscribe = onSnapshot(
      collection(this.firestore, 'vacation'),
      (snapshot) => {
        this.vacations = [];
        snapshot.forEach((element) => {
          this.vacations.push(this.mapVacation(element.id, element.data()));
        });
      }
    );
  }

  async add(vacation: Vacation) {
    await addDoc(collection(this.firestore, 'vacation'), {
      vacStart: vacation.vacStart,
      vacEnd: vacation.vacEnd,
      daysNeeded: vacation.daysNeeded,
      reason: vacation.reason,
      approved: vacation.approved,
    });
  }

  getDaysAlreadyTaken(): number {
    return this.vacations.reduce((total, vac) => total + vac.daysNeeded, 0);
  }

  private mapVacation(id: string, obj: any): Vacation {
    return {
      id,
      vacStart: obj.vacStart,
      vacEnd: obj.vacEnd,
      daysNeeded: obj.daysNeeded,
      reason: obj.reason,
      approved: obj.approved,
    };
  }

  ngOnDestroy() {
    this.unsubscribe();
  }
}