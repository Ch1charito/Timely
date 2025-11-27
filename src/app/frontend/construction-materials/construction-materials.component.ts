import { Component, inject } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { RouterModule } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';
import { AddMaterialOverlayComponent } from "./add-material-overlay/add-material-overlay.component";
import { CommonModule } from '@angular/common';
import { EditMaterialOverlayComponent } from "./edit-material-overlay/edit-material-overlay.component";

@Component({
  selector: 'app-construction-materials',
  imports: [HeaderComponent, RouterModule, AddMaterialOverlayComponent, CommonModule, EditMaterialOverlayComponent],
  templateUrl: './construction-materials.component.html',
  styleUrl: './construction-materials.component.scss'
})
export class ConstructionMaterialsComponent {
  firebaseService = inject(FirebaseService);
  showAddOverlay: boolean = false;
  showEditOverlay: boolean = false;

  openAddOverlay() {
    this.showAddOverlay = true;
  }

  closeAddOverlay() {
    this.showAddOverlay = false;
  }

  openEditOverlay() {
    this.showEditOverlay = true;
  }

  closeEditOverlay() {
    this.showEditOverlay = false;
  }

  deleteMaterial(id: string | undefined) {
    if (!id) return;
    this.firebaseService.deleteMaterialFromDatabase(id);
  }

}
