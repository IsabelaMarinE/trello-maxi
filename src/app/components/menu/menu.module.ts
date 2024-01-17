import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    MenuComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    MenuComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class MenuModule { }
