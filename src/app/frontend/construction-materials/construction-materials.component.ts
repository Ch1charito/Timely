import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-construction-materials',
  imports: [HeaderComponent, RouterModule, CommonModule],
  templateUrl: './construction-materials.component.html',
  styleUrl: './construction-materials.component.scss',
})
export class ConstructionMaterialsComponent {
  constructor(public firebaseService: FirebaseService) {}
}
