import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { SharedModule } from '../../shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreFeatureKey, StoreReducer } from '../../shared/store/store.reducer';
import { BoardEffects } from '../../shared/store/effects/boards/board.effect';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from '../modal/modal.module';


@NgModule({
  declarations: [
    MenuComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    ModalModule,
    StoreModule.forFeature(StoreFeatureKey, StoreReducer),
    EffectsModule.forFeature(BoardEffects)
  ],
  exports: [
    MenuComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class MenuModule { }
