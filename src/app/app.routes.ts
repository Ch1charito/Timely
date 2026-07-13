import { Routes } from '@angular/router';
import { LoginComponent } from './frontend/login/login.component';
import { HomescreenComponent } from './frontend/homescreen/homescreen.component';
import { TimeRecordingComponent } from './frontend/time-recording/time-recording.component';
import { VacationManagementComponent } from './frontend/vacation-management/vacation-management.component';
import { ConstructionMaterialsComponent } from './frontend/construction-materials/construction-materials.component';
import { ConstructionToolsComponent } from './frontend/construction-tools/construction-tools.component';
import { ImpressumComponent } from './frontend/impressum/impressum.component';
import { PrivacyPolicyComponent } from './frontend/privacy-policy/privacy-policy.component';
import { NotFoundComponent } from './frontend/not-found/not-found.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'homescreen', component: HomescreenComponent, canActivate: [authGuard] },
  { path: 'time', component: TimeRecordingComponent, canActivate: [authGuard] },
  { path: 'vacation', component: VacationManagementComponent, canActivate: [authGuard] },
  { path: 'materials', component: ConstructionMaterialsComponent, canActivate: [authGuard] },
  { path: 'tools', component: ConstructionToolsComponent, canActivate: [authGuard] },
  { path: 'impressum', component: ImpressumComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: '**', component: NotFoundComponent }
];