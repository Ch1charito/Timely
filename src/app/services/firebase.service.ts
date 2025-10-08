import { Injectable, inject, OnDestroy } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from '@angular/fire/firestore';
import { Material } from '../interfaces/material.interface';
import { Tool } from '../interfaces/tool.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { Worksession } from '../interfaces/worksession.interface';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService implements OnDestroy {
  firestore = inject(Firestore);
  worksession : Worksession[] = [];
  materials: Material[] = [];
  tools: Tool[] = [];
  unsubscribeMaterials: () => void;
  unsubscribeTools: () => void;

  /* Maybe not needed, but keeping for now

  private materialsSubject = new BehaviorSubject<Material[]>([]);
  materials$: Observable<Material[]> = this.materialsSubject.asObservable();

  private toolsSubject = new BehaviorSubject<Tool[]>([]);
  tools$: Observable<Tool[]> = this.toolsSubject.asObservable();

  */

  constructor() {
    /* Get Materials from Firestore */
    this.unsubscribeMaterials = onSnapshot(
      collection(this.firestore, 'materials'),
      (materialsSnapshot) => {
        this.materials = [];
        materialsSnapshot.forEach((element) => {
          this.materials.push(
            this.setMaterialObject(element.id, element.data())
          );
        });
        this.materials.sort((a, b) => a.name.localeCompare(b.name));
      }
    );

    /* Get Tools from Firestore */
    this.unsubscribeTools = onSnapshot(
      collection(this.firestore, 'tools'),
      (toolsSnapshot) => {
        this.tools = [];
        toolsSnapshot.forEach((element) => {
          this.tools.push(this.setToolObject(element.id, element.data()));
        });
      }
    );

    /* Get Worksessions from Firestore */
    this.unsubscribeTools = onSnapshot(
      collection(this.firestore, 'worksession'),
      (worksessionSnapshot) => {
        this.worksession = [];
        worksessionSnapshot.forEach((element) => {
          this.worksession.push(
            this.setWorksessionObject(element.id, element.data())
          );
        });
        this.sortByDate(this.worksession);
      }
    );
  }

  /* Add Material, Tool and Worksession to Database */

  async addMaterialToDatabase(material: Material) {
    await addDoc(collection(this.firestore, 'materials'), {
      name: material.name,
      description: material.description,
      quantity: material.quantity,
      unit: material.unit,
      category: material.category,
    });
  }

  async addToolToDatabase(tool: Tool) {
    await addDoc(collection(this.firestore, 'tools'), {
      name: tool.name,
      description: tool.description,
      category: tool.category,
      inUse: tool.inUse,
    });
  }

  async addWorksessionToDatabase(worksession: Worksession) {
    await addDoc(collection(this.firestore, 'worksession'), {
      date: worksession.date,
      worktime: worksession.worktime
    });
  }

  /* Delete Material and Tool from Database */

  async deleteMaterialFromDatabase(id: string) {
    await deleteDoc(doc(this.firestore, 'materials', id));
  }

  async deleteToolFromDatabase(id: string) {
    await deleteDoc(doc(this.firestore, 'tools', id));
  }

  /* Update Material and Tool in Database */

  async updateMaterialInDatabase(id: string, material: Material) {
    await updateDoc(doc(this.firestore, 'materials', id), {
      name: material.name,
      description: material.description,
      quantity: material.quantity,
      unit: material.unit,
      category: material.category,
    });
  }

  async updateToolInDatabase(id: string, tool: Tool) {
    await updateDoc(doc(this.firestore, 'tools', id), {
      name: tool.name,
      description: tool.description,
      category: tool.category,
      inUse: tool.inUse,
    });
  }

  /* Setter for Material and Tool objects, convert the data to the correct type */

  setMaterialObject(id: string, obj: any): Material {
    return {
      id: id,
      name: obj.name,
      description: obj.description,
      quantity: obj.quantity,
      unit: obj.unit,
      category: obj.category,
    };
  }

  setToolObject(id: string, obj: any): Tool {
    return {
      id: id,
      name: obj.name,
      description: obj.description,
      category: obj.category,
      inUse: obj.inUse,
    };
  }

  setWorksessionObject(id: string, obj: any): Worksession{
    return {
      id: id,
      date: obj.date,
      worktime: obj.worktime,
    };
  }

  ngOnDestroy() {
    this.unsubscribeMaterials();
    this.unsubscribeTools();
  }

  /* help function to sort by date */
  sortByDate(array: { date: string }[]) {
    array.sort((a, b) => {
      const [dayA, monthA, yearA] = a.date.split('.').map(Number);
      const [dayB, monthB, yearB] = b.date.split('.').map(Number);
      const dateA = new Date(yearA, monthA - 1, dayA);
      const dateB = new Date(yearB, monthB - 1, dayB);
      return dateB.getTime() - dateA.getTime();
    });
  }
}
