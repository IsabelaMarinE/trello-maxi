import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import * as boardActions from '../../shared/store/actions/boards/boards.actions';
import * as boardSelector from '../../shared/store/selectors/boards/board.selector';
import { Subject, takeUntil } from 'rxjs';
import { StoreState } from '../../shared/store/store.reducer';
import { BoardModel } from '../../shared/models/boards/board.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from '../modal/modal.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @ViewChild('ViewClientTemplate')
  ViewClientTemplate!: TemplateRef<any>;

  public ngDestroyed$ = new Subject();
  public listBoards!: Array<BoardModel>;
  public boardForm: FormGroup = this.formBuilder.group({
    title: ['', Validators.required],
  });

  constructor(
    private postStore: Store<StoreState>,
    private modalService: ModalService,
    private formBuilder: FormBuilder,
  ){}

  ngOnInit() {
    this.postStore.dispatch(boardActions.loadBoards());
    this.storeSubscription();
  }

  public ngOnDestroy() {
    this.postStore.dispatch(boardActions.clearStoreFlags());
    this.ngDestroyed$.next(true);
    this.ngDestroyed$.unsubscribe();
  }

  private storeSubscription(){
    this.postStore
      .select(boardSelector.selectListBoards)
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe((response) => {
        console.log("response",response)
        if(response && response.state){
          this.listBoards = _.cloneDeep(response.items);
        }
      })
  }

  public addNewBoard(){

  }

  public modalNewBoard(){
    this.modalService.openModal({
      title: 'New Board',
      mainContent: this.ViewClientTemplate
    });
  }

}
