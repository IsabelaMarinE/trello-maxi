import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import * as _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import * as columnActions from '../../shared/store/actions/columns/columns.actions';
import * as taskActions from '../../shared/store/actions/tasks/task.actions';
import * as boardSelector from '../../shared/store/selectors/boards/board.selector';
import * as columnSelector from '../../shared/store/selectors/columns/column.selector';
import * as taskSelector from '../../shared/store/selectors/tasks/task.selector';
import { StoreState } from '../../shared/store/store.reducer';
import { ModalService } from '../modal/modal.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ColumnModel } from '../../shared/models/columns/column.model';
import { TaskModel } from '../../shared/models/tasks/task.model';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @ViewChild('ViewColumnTemplate')
  ViewColumnTemplate!: TemplateRef<any>;
  @ViewChild('ViewTaskTemplate')
  ViewTaskTemplate!: TemplateRef<any>;

  public ngDestroyed$ = new Subject();
  public isBoardSelected = false;
  public listOfColumns: any;
  private idBoard: string = '';
  public columnForm: FormGroup = this.formBuilder.group({
    title: ['', Validators.required],
  });
  public taskForm: FormGroup = this.formBuilder.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    id_column: ['', Validators.required],
    sub_tasks: this.formBuilder.array([])
  });
  constructor(
    private postStore: Store<StoreState>,
    private modalService: ModalService,
    private formBuilder: FormBuilder
  ){}

  ngOnInit() {
    this.storeSubscription();
  }

  get sub_tasks() {
    return this.taskForm.controls["sub_tasks"] as FormArray;
  }

  private storeSubscription(){
    this.postStore
      .select(boardSelector.loadBoardById)
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe((response) => {
        if(response?.state){
          this.isBoardSelected = true;
          this.idBoard = response.items[0].id;
          this.postStore.dispatch(columnActions.getAllColumns({id_board: this.idBoard}))
        }
      })
    this.postStore
      .select(boardSelector.loadBoardById)
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe((response) => {
        if(response?.state){
          this.isBoardSelected = true;
          this.idBoard = response.items[0].id;
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
      .select(columnSelector.createColumnResponse)
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
          this.modalService.closeModal();
        }
      })
  }

  public addNewColumn(){
    if(this.columnForm.valid){
      const request = new ColumnModel;
      request.id = uuidv4();
      request.title = this.columnForm.value.title;
      request.id_board = this.idBoard;
      request.task_list = [];
      this.postStore.dispatch(columnActions.createColumn({request: request}));
      this.modalService.closeModal();
    }
  }

  public addNewTask(){
    if(this.taskForm.valid){
      const newTask: TaskModel = _.cloneDeep(this.taskForm.value);
      this.postStore.dispatch(taskActions.createTask({request: newTask}));
    }
  }

  public modalNewColumn(){
    this.modalService.openModal({
      title: 'New Column',
      mainContent: this.ViewColumnTemplate
    });
  }

  public modalNewTask(){
    this.modalService.openModal({
      title: 'New Task',
      mainContent: this.ViewTaskTemplate
    });
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

}
