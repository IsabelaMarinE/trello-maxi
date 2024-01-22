import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/buttons/button.component';
import { CardComponent } from './components/card/card.component';


@NgModule({
  declarations: [
    ButtonComponent,
    CardComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ButtonComponent,
    CardComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class SharedModule { }
