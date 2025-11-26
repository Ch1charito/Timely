import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-material-overlay',
  imports: [],
  templateUrl: './add-material-overlay.component.html',
  styleUrl: './add-material-overlay.component.scss'
})
export class AddMaterialOverlayComponent {
  @Output() close = new EventEmitter<void>();


  onClose() {
    this.close.emit();
  }

}
