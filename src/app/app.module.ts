import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BienvenidaComponent } from './bienvenida/bienvenida.component';
import { PrincipalComponent } from './principal/principal.component';
import { PortadaComponent } from './portada/portada.component';
import { SignupComponent } from './signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { GenericPageComponent } from './Modulos/generic-page/generic-page.component';
@NgModule({
  declarations: [
    AppComponent,
    BienvenidaComponent,
    PrincipalComponent,
    PortadaComponent,
    GenericPageComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SignupComponent,
    LoginComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
