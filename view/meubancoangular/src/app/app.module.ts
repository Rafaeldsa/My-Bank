import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { PagesModule } from './pages/pages.module';
import { ClienteService } from './services/cliente.service';
import { ContasService } from './services/contas.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    PagesModule,
    BrowserAnimationsModule,
  ],
  providers: [ClienteService, ContasService],
  bootstrap: [AppComponent]
})
export class AppModule { }
