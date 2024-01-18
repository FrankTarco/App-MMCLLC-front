import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './app.material.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddDashboardComponent } from './add-dashboard/add-dashboard.component';
import { BodyComponent } from './add-dashboard/body/body.component';
import { HeaderComponent } from './add-dashboard/header/header.component';
import { SidebarComponent } from './add-dashboard/sidebar/sidebar.component';
import { AddGastosComponent } from './components/add-gastos/add-gastos.component';
import { AddIngresosComponent } from './components/add-ingresos/add-ingresos.component';
import { AddPersonalComponent } from './components/add-personal/add-personal.component';
import { ActionsPersonalComponent } from './dialogs/actions-personal/actions-personal.component';
import { ActionsGastosComponent } from './dialogs/actions-gastos/actions-gastos.component';
import { ActionsIngresosComponent } from './dialogs/actions-ingresos/actions-ingresos.component';
import { AddConfirmComponent } from './dialogs/add-confirm/add-confirm.component';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    AddDashboardComponent,
    BodyComponent,
    HeaderComponent,
    SidebarComponent,
    AddGastosComponent,
    AddIngresosComponent,
    AddPersonalComponent,
    ActionsPersonalComponent,
    ActionsGastosComponent,
    ActionsIngresosComponent,
    AddConfirmComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
