import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-material-overlay',
  imports: [FormsModule],
  templateUrl: './edit-material-overlay.component.html',
  styleUrl: './edit-material-overlay.component.scss'
})
export class EditMaterialOverlayComponent {
  @Output() close = new EventEmitter<void>();


  onClose() {
    this.close.emit();
  }

}
