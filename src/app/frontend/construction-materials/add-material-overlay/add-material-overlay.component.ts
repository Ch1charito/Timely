import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MaterialService } from '../../../services/material.service';
import { Material } from '../../../interfaces/material.interface';

@Component({
  selector: 'app-add-material-overlay',
  imports: [FormsModule],
  templateUrl: './add-material-overlay.component.html',
  styleUrl: './add-material-overlay.component.scss'
})
export class AddMaterialOverlayComponent {
  materialService = inject(MaterialService);
  @Output() close = new EventEmitter<void>();

  material: Material = {
    name: '',
    description: 'No data',
    quantity: 1,
    unit: '',
    category: '',
  };

  async submitMaterial(form: NgForm) {
    if (form.invalid) return;
    await this.materialService.add(this.material);
    this.close.emit();
  }

  onClose() {
    this.close.emit();
  }

}
