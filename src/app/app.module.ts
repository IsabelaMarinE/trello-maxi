import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuModule } from './components/menu/menu.module';
import { HeaderModule } from './components/header/header.module';
import { ModalModule } from './components/modal/modal.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MenuModule,
    HeaderModule,
    ModalModule,
    StoreModule.forRoot(),
    EffectsModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
