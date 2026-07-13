import { Injectable, inject, OnDestroy } from '@angular/core';
import { Firestore, addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from '@angular/fire/firestore';
import { Tool } from '../interfaces/tool.interface';

@Injectable({ providedIn: 'root' })
export class ToolService implements OnDestroy {
  private firestore = inject(Firestore);
  tools: Tool[] = [];
  private unsubscribe: () => void;

  constructor() {
    this.unsubscribe = onSnapshot(
      collection(this.firestore, 'tools'),
      (snapshot) => {
        this.tools = [];
        snapshot.forEach((element) => {
          this.tools.push(this.mapTool(element.id, element.data()));
        });
      }
    );
  }

  async add(tool: Tool) {
    await addDoc(collection(this.firestore, 'tools'), {
      name: tool.name,
      description: tool.description,
      category: tool.category,
      inUse: tool.inUse,
    });
  }

  async update(id: string, tool: Tool) {
    await updateDoc(doc(this.firestore, 'tools', id), {
      name: tool.name,
      description: tool.description,
      category: tool.category,
      inUse: tool.inUse,
    });
  }

  async delete(id: string) {
    await deleteDoc(doc(this.firestore, 'tools', id));
  }

  private mapTool(id: string, obj: any): Tool {
    return {
      id,
      name: obj.name,
      description: obj.description,
      category: obj.category,
      inUse: obj.inUse,
    };
  }

  ngOnDestroy() {
    this.unsubscribe();
  }
}