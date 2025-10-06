import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-construction-tools',
  imports: [HeaderComponent, RouterModule],
  templateUrl: './construction-tools.component.html',
  styleUrl: './construction-tools.component.scss'
})
export class ConstructionToolsComponent {

}
