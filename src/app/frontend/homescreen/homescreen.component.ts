import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { RouterModule } from '@angular/router';
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-homescreen',
  imports: [HeaderComponent, RouterModule, FooterComponent],
  templateUrl: './homescreen.component.html',
  styleUrl: './homescreen.component.scss'
})
export class HomescreenComponent {

}
