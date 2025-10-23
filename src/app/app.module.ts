import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BienvenidaComponent } from './bienvenida/bienvenida.component';
import { PrincipalComponent } from './principal/principal.component';
import { PortadaComponent } from './portada/portada.component';
import { SignupComponent } from './signup/signup.component';
import { PagesComponent } from './Modulo1/Historia1/pages/pages.component';
import { PagesM2Component } from './Modulo2/pages-m2/pages-m2.component';
import { PagesM3Component } from './Modulo3/pages-m3/pages-m3.component';
import { PagesM4Component } from './Modulo4/pages-m4/pages-m4.component';
import { PagesM5Component } from './Modulo5/pages-m5/pages-m5.component';
import { HttpClientModule } from '@angular/common/http';
import { PagesM6Component } from './Modulo6/pages-m6/pages-m6.component';
@NgModule({
  declarations: [
    AppComponent,
    BienvenidaComponent,
    PrincipalComponent,
    PortadaComponent,

    PagesComponent,
    PagesM2Component,
    PagesM3Component,
    PagesM4Component,
    PagesM5Component,
    PagesM6Component,
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
