import { Component, inject } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { RouterModule } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-construction-tools',
  imports: [HeaderComponent, RouterModule],
  templateUrl: './construction-tools.component.html',
  styleUrl: './construction-tools.component.scss'
})
export class ConstructionToolsComponent {
  firebaseService = inject(FirebaseService);

}
