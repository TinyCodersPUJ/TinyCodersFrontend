import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidaComponent } from './bienvenida/bienvenida.component';
import { LoginComponent } from './login/login.component';
import { PrincipalComponent } from './principal/principal.component';
import { PortadaComponent } from './portada/portada.component';
import { SignupComponent } from './signup/signup.component';
import { PagesComponent } from './Modulo1/Historia1/pages/pages.component';
import { PagesM2Component } from './Modulo2/pages-m2/pages-m2.component';
import { PagesM3Component } from './Modulo3/pages-m3/pages-m3.component';
import { PagesM4Component } from './Modulo4/pages-m4/pages-m4.component';
import { PagesM5Component } from './Modulo5/pages-m5/pages-m5.component';

const routes: Routes = [
  { path: '', redirectTo: 'portada', pathMatch: 'full' },

  { path: 'bienvenida', component: BienvenidaComponent },
  { path: 'login', component: LoginComponent },
  { path: 'principal', component: PrincipalComponent },
  { path: 'portada', component: PortadaComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'Modulo1/:page', component: PagesComponent },
  { path: 'Modulo2/:page', component: PagesM2Component },
  { path: 'Modulo3/:page', component: PagesM3Component },
  { path: 'Modulo4/:page', component: PagesM4Component },
  { path: 'Modulo5/:page', component: PagesM5Component },
  
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
