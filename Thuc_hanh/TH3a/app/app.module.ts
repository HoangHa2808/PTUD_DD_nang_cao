import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
imports: [HttpClientModule]
import { IonicStorageModule } from '@ionic/storage-angular';
imports: [IonicStorageModule.forRoot()]

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthComponentComponent } from './login/login.page';

@NgModule({
  declarations: [AppComponent, AuthComponentComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  providers: [CommonModule, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
