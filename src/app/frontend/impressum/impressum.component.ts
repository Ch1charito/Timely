import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-impressum',
  imports: [HeaderComponent, RouterModule],
  templateUrl: './impressum.component.html',
  styleUrl: './impressum.component.scss'
})
export class ImpressumComponent {

}
