import { Component, inject } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { RouterModule } from '@angular/router';
import { ToolService } from '../../services/tool.service';
import { Tool } from '../../interfaces/tool.interface';

@Component({
  selector: 'app-construction-tools',
  imports: [HeaderComponent, RouterModule],
  templateUrl: './construction-tools.component.html',
  styleUrl: './construction-tools.component.scss'
})
export class ConstructionToolsComponent {
  toolService = inject(ToolService);

  toggleInUse(item: Tool) {
    item.inUse = !item.inUse;
    this.toolService.update(item.id!, item);
  }

}
