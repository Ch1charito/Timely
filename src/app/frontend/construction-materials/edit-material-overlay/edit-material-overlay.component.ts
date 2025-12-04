import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FirebaseService } from '../../../services/firebase.service';
import { Material } from '../../../interfaces/material.interface';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-edit-material-overlay',
  imports: [FormsModule, NgIf],
  templateUrl: './edit-material-overlay.component.html',
  styleUrl: './edit-material-overlay.component.scss'
})
export class EditMaterialOverlayComponent {
  firebaseService = inject(FirebaseService);
  @Input() editingMaterial: Material | null = null;
  @Output() close = new EventEmitter<void>();

  saveEdit() {
    if (!this.editingMaterial?.id) return;
    this.firebaseService.updateMaterialInDatabase(
      this.editingMaterial.id,
      this.editingMaterial
    );
    this.onClose();
  }

  onClose() {
    this.close.emit();
  }

}
