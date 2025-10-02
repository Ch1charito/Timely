import { Injectable, inject, OnDestroy } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Material } from '../interfaces/material.interface';
import { Tool } from '../interfaces/tool.interface';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService implements OnDestroy {
  firestore = inject(Firestore);

  materials: Material[] = [];
  tools: Tool[] = [];

  constructor() {}

  ngOnDestroy() {}
}
