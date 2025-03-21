import {Routes} from '@angular/router';
import {LoginComponent} from './features/login/login.component';
import {RegisterComponent} from './features/register/register.component';

export const routes: Routes =
  [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
  ];
