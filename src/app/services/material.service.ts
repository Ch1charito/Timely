import { Injectable, inject, OnDestroy, signal } from '@angular/core';
import { Firestore, addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from '@angular/fire/firestore';
import { Material } from '../interfaces/material.interface';

@Injectable({ providedIn: 'root' })
export class MaterialService implements OnDestroy {
  private firestore = inject(Firestore);
  materials = signal<Material[]>([]);
  private unsubscribe: () => void;

  constructor() {
    this.unsubscribe = onSnapshot(
      collection(this.firestore, 'materials'),
      (snapshot) => {
        const items: Material[] = [];
        snapshot.forEach((element) => {
          items.push(this.mapMaterial(element.id, element.data()));
        });
        items.sort((a, b) => a.name.localeCompare(b.name));
        this.materials.set(items);
      }
    );
  }

  async add(material: Material) {
    await addDoc(collection(this.firestore, 'materials'), {
      name: material.name,
      description: material.description,
      quantity: material.quantity,
      unit: material.unit,
      category: material.category,
    });
  }

  async update(id: string, material: Material) {
    await updateDoc(doc(this.firestore, 'materials', id), {
      name: material.name,
      description: material.description,
      quantity: material.quantity,
      unit: material.unit,
      category: material.category,
    });
  }

  async delete(id: string) {
    await deleteDoc(doc(this.firestore, 'materials', id));
  }

  private mapMaterial(id: string, obj: any): Material {
    return {
      id,
      name: obj.name,
      description: obj.description,
      quantity: obj.quantity,
      unit: obj.unit,
      category: obj.category,
    };
  }

  ngOnDestroy() {
    this.unsubscribe();
  }
}