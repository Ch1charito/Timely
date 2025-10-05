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

  /* Add Material and Tool to Database */

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

  ngOnDestroy() {
    this.unsubscribeMaterials();
    this.unsubscribeTools();
  }
}
