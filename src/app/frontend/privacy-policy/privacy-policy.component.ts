import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-privacy-policy',
  imports: [HeaderComponent, RouterModule],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss'
})
export class PrivacyPolicyComponent {

}
