import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import * as boardActions from '../../../shared/store/actions/boards/boards.actions';
import * as boardSelector from '../../../shared/store/selectors/boards/board.selector';
import * as columnSelector from '../../../shared/store/selectors/columns/column.selector';
import { ColumnModel } from '../../../shared/models/columns/column.model';
import { StoreState } from '../../../shared/store/store.reducer';
import { BoardModel } from '../../../shared/models/boards/board.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public ngDestroyed$ = new Subject();
  public listColumns!: Array<ColumnModel>;
  public board!: BoardModel[];

  constructor(
    private postStore: Store<StoreState>,
  ){}

  ngOnInit() {
    this.storeSubscription();
  }

  public ngOnDestroy() {
    this.postStore.dispatch(boardActions.clearStoreFlags());
    this.ngDestroyed$.next(true);
    this.ngDestroyed$.unsubscribe();
  }

  private storeSubscription(){
    this.postStore
      .select(boardSelector.loadBoardById)
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe((response) => {
        if(response && response.state){
          this.board = _.cloneDeep(response.items);
          this.listColumns = this.board[0].column_list;
        }
      })

    this.postStore
      .select(columnSelector.createColumnResponse)
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe((response) => {
        if(response && response.state){
          this.listColumns = _.cloneDeep(response.items[0]);
        }
      })
  }

}
