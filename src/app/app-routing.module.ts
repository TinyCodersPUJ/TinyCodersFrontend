import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidaComponent } from './bienvenida/bienvenida.component';
import { LoginComponent } from './login/login.component';
import { PrincipalComponent } from './principal/principal.component';
import { PortadaComponent } from './portada/portada.component';
import { SignupComponent } from './signup/signup.component';
import { GenericPageComponent } from './Modulos/generic-page/generic-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'portada', pathMatch: 'full' },

  { path: 'bienvenida', component: BienvenidaComponent },
  { path: 'login', component: LoginComponent },
  { path: 'principal', component: PrincipalComponent },
  { path: 'portada', component: PortadaComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'Modulo/:modId/:page', component: GenericPageComponent },

  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
