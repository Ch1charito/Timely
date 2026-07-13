import { Injectable, inject, OnDestroy, signal, computed } from '@angular/core';
import { Firestore, addDoc, collection, onSnapshot } from '@angular/fire/firestore';
import { Vacation } from '../interfaces/vacation.interface';

@Injectable({ providedIn: 'root' })
export class VacationService implements OnDestroy {
  private firestore = inject(Firestore);
  vacations = signal<Vacation[]>([]);
  daysAlreadyTaken = computed(() => this.vacations().reduce((total, vac) => total + vac.daysNeeded, 0));
  private unsubscribe: () => void;

  constructor() {
    this.unsubscribe = onSnapshot(
      collection(this.firestore, 'vacation'),
      (snapshot) => {
        const items: Vacation[] = [];
        snapshot.forEach((element) => {
          items.push(this.mapVacation(element.id, element.data()));
        });
        this.vacations.set(items);
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