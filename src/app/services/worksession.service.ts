import { Injectable, inject, OnDestroy, signal } from '@angular/core';
import { Firestore, addDoc, collection, onSnapshot } from '@angular/fire/firestore';
import { Worksession } from '../interfaces/worksession.interface';

@Injectable({ providedIn: 'root' })
export class WorksessionService implements OnDestroy {
  private firestore = inject(Firestore);
  worksessions = signal<Worksession[]>([]);
  private unsubscribe: () => void;

  constructor() {
    this.unsubscribe = onSnapshot(
      collection(this.firestore, 'worksession'),
      (snapshot) => {
        const items: Worksession[] = [];
        snapshot.forEach((element) => {
          items.push(this.mapWorksession(element.id, element.data()));
        });
        this.sortByDate(items);
        this.worksessions.set(items);
      }
    );
  }

  async add(worksession: Worksession) {
    await addDoc(collection(this.firestore, 'worksession'), {
      date: worksession.date,
      worktime: worksession.worktime,
    });
  }

  private mapWorksession(id: string, obj: any): Worksession {
    return {
      id,
      date: obj.date,
      worktime: obj.worktime,
    };
  }

  private sortByDate(items: Worksession[]) {
    items.sort((a, b) => {
      const [dayA, monthA, yearA] = a.date.split('.').map(Number);
      const [dayB, monthB, yearB] = b.date.split('.').map(Number);
      return new Date(yearB, monthB - 1, dayB).getTime() - new Date(yearA, monthA - 1, dayA).getTime();
    });
  }

  ngOnDestroy() {
    this.unsubscribe();
  }
}