import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';
import { LoginComponent } from './auth/login/login';
import { BanqueComponent } from './home/Banque/banque';
import { CompteBancaireComponent } from './home/compte-bancaire/compte-bancaire';
import { DeviseComponent } from './home/Devise/devise';
import { FluxComponent } from './home/flux/flux';
import { HomeComponent } from './home/home.component';
import { ParametrageLibelleComponent } from './home/parametrage-libelle/parametrage-libelle';

import { loginGuard } from './login.guard';
import { ConnexionComponent } from './modules/connexion/connexion';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard],
  },
  {
    path: '',
    component: LoginComponent,
    canActivate: [loginGuard],
  },
  { path: 'devise', component: DeviseComponent, canActivate: [authGuard] },
  { path: 'banque', component: BanqueComponent, canActivate: [authGuard] },
  { path: 'compte', component: CompteBancaireComponent, canActivate: [authGuard] },
  { path: 'flux', component: FluxComponent, canActivate: [authGuard] },
  { path: 'libelle', component: ParametrageLibelleComponent, canActivate: [authGuard] },
  {
    path: 'connexion',
    component: ConnexionComponent,
  },
];




