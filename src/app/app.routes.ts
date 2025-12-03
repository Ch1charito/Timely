import { Routes } from '@angular/router';
import { LoginComponent } from './frontend/login/login.component';
import { HomescreenComponent } from './frontend/homescreen/homescreen.component';
import { TimeRecordingComponent } from './frontend/time-recording/time-recording.component';
import { VacationManagementComponent } from './frontend/vacation-management/vacation-management.component';
import { ConstructionMaterialsComponent } from './frontend/construction-materials/construction-materials.component';
import { ConstructionToolsComponent } from './frontend/construction-tools/construction-tools.component';
import { ImpressumComponent } from './frontend/impressum/impressum.component';
import { PrivacyPolicyComponent } from './frontend/privacy-policy/privacy-policy.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    {path: 'login', component: LoginComponent},
    {path: 'homescreen', component: HomescreenComponent },
    {path: 'time', component: TimeRecordingComponent},
    {path: 'vacation', component: VacationManagementComponent},
    {path: 'materials', component: ConstructionMaterialsComponent},
    {path: 'tools', component: ConstructionToolsComponent},
    {path: 'impressum', component: ImpressumComponent},
    {path: 'privacy-policy', component: PrivacyPolicyComponent}
];