import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { SharedModule } from '../../shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreFeatureKey, StoreReducer } from '../../shared/store/store.reducer';
import { BoardEffects } from '../../shared/store/effects/boards/board.effect';


@NgModule({
  declarations: [
    MenuComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
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
