import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home.component';
import { HomeRoutingModule } from './home-routing.component';
import { SharedModule } from '../../shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreFeatureKey, StoreReducer } from '../../shared/store/store.reducer';
import { BoardEffects } from '../../shared/store/effects/boards/board.effect';
import { ReactiveFormsModule } from '@angular/forms';
import { CdkDrag, CdkDropList, DragDropModule } from '@angular/cdk/drag-drop';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    DragDropModule,
    CdkDropList,
    CdkDrag,
    StoreModule.forFeature(StoreFeatureKey, StoreReducer),
    EffectsModule.forFeature(BoardEffects)
  ],
  exports: [],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class MenuModule { }
