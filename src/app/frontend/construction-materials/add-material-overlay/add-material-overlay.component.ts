import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { FirebaseService } from '../../../services/firebase.service';
import { Material } from '../../../interfaces/material.interface';

@Component({
  selector: 'app-add-material-overlay',
  imports: [FormsModule],
  templateUrl: './add-material-overlay.component.html',
  styleUrl: './add-material-overlay.component.scss'
})
export class AddMaterialOverlayComponent {
  firebaseService = inject(FirebaseService);
  @Output() close = new EventEmitter<void>();

  material: Material = {
    name: '',
    description: '',
    quantity: 0,
    unit: '',
    category: '',
  };

  async submitMaterial(form: NgForm) {
    if (form.invalid) return;
    await this.firebaseService.addMaterialToDatabase(this.material);
    this.close.emit();
  }

  onClose() {
    this.close.emit();
  }

}
