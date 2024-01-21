import { Injectable, TemplateRef } from '@angular/core';
import { NzModalService, NzModalRef } from 'ng-zorro-antd/modal';
import { ModalComponent } from './modal.component';

export const BASE_MODAL_CONFIG = {
  nzTitle: null,
  nzContent: ModalComponent,
  nzFooter: null,
  nzClosable: false,
  nzMaskClosable: false,
  nzClassName: '',
};

export interface InfoModalProps {
  title: string;
  mainContent?: TemplateRef<{}>;
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private nzModalService: NzModalService) { }
  public tplFooter!: TemplateRef<{}>;

  openModal(options: InfoModalProps){
    const modal: NzModalRef =this.nzModalService.create({
      nzTitle: options.title,
      nzContent: options.mainContent,
      nzMaskClosable: false,
      nzFooter: [
        {
          label: 'Cerrar',
          shape: 'round',
          onClick: () => modal.destroy()
        }
      ],
      nzOnOk: () => console.log('Click ok')
    });
  }
}
