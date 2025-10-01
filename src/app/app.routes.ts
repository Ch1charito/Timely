import { Routes } from '@angular/router';
import { LoginComponent } from './frontend/login/login.component';
import { HomescreenComponent } from './frontend/homescreen/homescreen.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    {path: 'login', component: LoginComponent},
    {path: 'homescreen', component: HomescreenComponent },
];