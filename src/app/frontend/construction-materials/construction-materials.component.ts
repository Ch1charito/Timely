import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-construction-materials',
  imports: [HeaderComponent, RouterModule],
  templateUrl: './construction-materials.component.html',
  styleUrl: './construction-materials.component.scss'
})
export class ConstructionMaterialsComponent {

}
