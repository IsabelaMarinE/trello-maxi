import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { ModalComponent } from './modal.component';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal'
import { ModalService } from './modal.service';


@NgModule({
  declarations: [
    ModalComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NzModalModule
  ],
  exports: [
    ModalComponent
  ],
  providers: [
    NzModalService,
    ModalService
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class ModalModule { }
