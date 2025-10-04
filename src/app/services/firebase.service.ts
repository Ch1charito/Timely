import { Injectable, inject, OnDestroy } from '@angular/core';
import { Firestore, collection, onSnapshot } from '@angular/fire/firestore';
import { Material } from '../interfaces/material.interface';
import { Tool } from '../interfaces/tool.interface';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService implements OnDestroy {
  firestore = inject(Firestore);

  materials: Material[] = [];
  tools: Tool[] = [];
  unsubscribeMaterials: () => void;
  unsubscribeTools: () => void;

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

  ngOnDestroy() {
    this.unsubscribeMaterials();
    this.unsubscribeTools();
  }
}
