import { Component, inject } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { RouterModule } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-construction-materials',
  imports: [HeaderComponent, RouterModule],
  templateUrl: './construction-materials.component.html',
  styleUrl: './construction-materials.component.scss'
})
export class ConstructionMaterialsComponent {
  firebaseService = inject(FirebaseService);

}
