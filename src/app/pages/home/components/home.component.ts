import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import {
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import * as boardActions from '../../../shared/store/actions/boards/boards.actions';
import * as taskActions from '../../../shared/store/actions/tasks/task.actions';
import * as columnActions from '../../../shared/store/actions/columns/columns.actions';
import * as boardSelector from '../../../shared/store/selectors/boards/board.selector';
import * as columnSelector from '../../../shared/store/selectors/columns/column.selector';
import * as taskSelector from '../../../shared/store/selectors/tasks/task.selector';
import { ColumnModel } from '../../../shared/models/columns/column.model';
import { StoreState } from '../../../shared/store/store.reducer';
import { BoardModel } from '../../../shared/models/boards/board.model';
import { TaskModel } from '../../../shared/models/tasks/task.model';
import { ModalService } from '../../../components/modal/modal.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('formTaksTemplate')
  formTaksTemplate!: TemplateRef<any>;

  public ngDestroyed$ = new Subject();
  public listColumns!: any;
  public listOfColumns: any;
  public board!: BoardModel[];
  public taskEdit!: TaskModel;

  public taskForm: FormGroup = this.formBuilder.group({
    id: [''],
    title: ['', Validators.required],
    description: ['', Validators.required],
    id_column: ['', Validators.required],
    sub_tasks: this.formBuilder.array([])
  });

  get sub_tasks() {
    return this.taskForm.controls["sub_tasks"] as FormArray;
  }

  constructor(
    private postStore: Store<StoreState>,
    private modalService: ModalService,
    private formBuilder: FormBuilder
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
        if(response?.state){
          const idBoard = response.items[0].id;
          this.postStore.dispatch(columnActions.getAllColumns({id_board: idBoard}))
        }
      })
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
    this.postStore
      .select(columnSelector.getAllColumnResponse)
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe((response) => {
        if(response?.state){
          this.listOfColumns = response.items[0];
        }
      })
    this.postStore
      .select(taskSelector.createTaskResponse)
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe((response) => {
        if(response?.state){
          this.board = _.cloneDeep(response.items[0]);
          this.listColumns = this.board[0].column_list;
        }
      })
    this.postStore
      .select(taskSelector.getTaskResponse)
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe((response) => {
        if(response?.state){
          this.taskEdit = _.cloneDeep(response.items[0]);
          this.setValuesForm(this.taskEdit);
        }
      })
    this.postStore
      .select(taskSelector.updateTaskResponse)
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe((response) => {
        if(response?.state){
          this.board = _.cloneDeep(response.items[0]);
          this.listColumns = this.board[0].column_list;
        }
      })
  }

  public setValuesForm(data: any){
    this.taskForm.patchValue({
      id: data.id,
      title: data.title,
      description: data.description,
      id_column: data.id_column
    });
    this.taskEdit.sub_tasks.forEach((subTask) => {
      const subTasksForm = this.formBuilder.group({
        description: [subTask.description, Validators.required],
        status: [subTask.status]
      });
      this.sub_tasks.push(subTasksForm);
    })
    this.modalService.openModal({
      title: 'Edit Task',
      mainContent: this.formTaksTemplate
    });
  }

  public editTask(data: any){
    if(data){
      this.postStore.dispatch(taskActions.loadTask({id: data}));
      this.modalService.closeModal();
    }
  }

  addSubTask() {
    const subTasksForm = this.formBuilder.group({
      description: ['', Validators.required],
      status: [false]
    });
    this.sub_tasks.push(subTasksForm);
  }

  deleteSubTask(index: number) {
    this.sub_tasks.removeAt(index);
  }

  public updateTask(){
    if(this.taskForm.valid){
      const editTask: TaskModel = _.cloneDeep(this.taskForm.value);
      this.postStore.dispatch(taskActions.updateTask({request: editTask}));
      this.taskForm.reset();
    }
  }

  public drop(event: any) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

}
