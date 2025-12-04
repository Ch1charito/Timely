import { Component, inject } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { RouterModule } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';
import { Tool } from '../../interfaces/tool.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-construction-tools',
  imports: [HeaderComponent, RouterModule, CommonModule],
  templateUrl: './construction-tools.component.html',
  styleUrl: './construction-tools.component.scss'
})
export class ConstructionToolsComponent {
  firebaseService = inject(FirebaseService);

  toggleInUse(item: Tool) {
    item.inUse = !item.inUse;
    this.firebaseService.updateToolInDatabase(item.id!, item);
  }

}
