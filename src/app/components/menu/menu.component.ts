import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import * as boardActions from '../../shared/store/actions/boards/boards.actions';
import * as boardSelector from '../../shared/store/selectors/boards/board.selector';
import { Subject, takeUntil } from 'rxjs';
import { StoreState } from '../../shared/store/store.reducer';
import { BoardModel } from '../../shared/models/boards/board.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  public ngDestroyed$ = new Subject();
  public listBoards!: Array<BoardModel>;

  constructor(
    private postStore: Store<StoreState>,
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
        if(response && response.state){
          this.listBoards = _.cloneDeep(response.items);
        }
      })
  }

}
