import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialService } from '../../../services/material.service';
import { Material } from '../../../interfaces/material.interface';

@Component({
  selector: 'app-edit-material-overlay',
  imports: [FormsModule],
  templateUrl: './edit-material-overlay.component.html',
  styleUrl: './edit-material-overlay.component.scss'
})
export class EditMaterialOverlayComponent {
  materialService = inject(MaterialService);
  @Input() editingMaterial: Material | null = null;
  @Output() close = new EventEmitter<void>();

  saveEdit() {
    if (!this.editingMaterial?.id) return;
    this.materialService.update(
      this.editingMaterial.id,
      this.editingMaterial
    );
    this.onClose();
  }

  onClose() {
    this.close.emit();
  }

}
