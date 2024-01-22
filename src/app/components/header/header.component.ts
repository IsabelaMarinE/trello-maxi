import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import * as _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import * as columnActions from '../../shared/store/actions/columns/columns.actions';
import * as boardSelector from '../../shared/store/selectors/boards/board.selector';
import { StoreState } from '../../shared/store/store.reducer';
import { ModalService } from '../modal/modal.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ColumnModel } from '../../shared/models/columns/column.model';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @ViewChild('ViewColumnTemplate')
  ViewColumnTemplate!: TemplateRef<any>;

  public ngDestroyed$ = new Subject();
  public isBoardSelected = false;
  private idBoard?: string;
  public columnForm: FormGroup = this.formBuilder.group({
    title: ['', Validators.required],
  });
  constructor(
    private postStore: Store<StoreState>,
    private modalService: ModalService,
    private formBuilder: FormBuilder
  ){}

  ngOnInit() {
    this.storeSubscription();
  }

  private storeSubscription(){
    this.postStore
      .select(boardSelector.loadBoardById)
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe((response) => {
        if(response?.state){
          this.isBoardSelected = true;
          this.idBoard = response.items[0].id;
        }
      })
  }

  public addNewColumn(){
    if(this.columnForm.valid){
      const request = new ColumnModel;
      request.id = uuidv4();
      request.title = this.columnForm.value.title;
      request.task_list = [];
      console.log("request ==",request)
      this.postStore.dispatch(columnActions.createColumn({request: request}));
      this.modalService.closeModal();
    }
  }

  public modalNewColumn(){
    this.modalService.openModal({
      title: 'New Column',
      mainContent: this.ViewColumnTemplate
    });
  }

}
