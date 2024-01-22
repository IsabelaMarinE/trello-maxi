import { createAction, props } from '@ngrx/store';
import { ResponseModel } from '../../../models/response.model';
import { TaskModel } from '../../../models/tasks/task.model';


export const clearStoreFlags = createAction('[Task] Clear Store Flags');

export const clearTask = createAction('[Task] Clear Task');

// Create Task
export const createTask = createAction(
    '[Task] Create Task',
    props<{ request: TaskModel }>()
)

export const createTaskSuccess = createAction(
    '[Task] Create Task Success',
    props<{ response: ResponseModel<TaskModel[]> }>()
)

export const createTaskFail = createAction(
    '[Task] Create Task Fail'
)

// Load Task By Id
export const loadTask = createAction(
  '[Task] Load Task',
  props<{ id: string }>()
)

export const loadTaskSuccess = createAction(
  '[Task] Load Task Success',
  props<{ response: ResponseModel<TaskModel> }>()
)

export const loadTaskFail = createAction(
  '[Task] Load Task Fail'
)

// Update Task
export const updateTask = createAction(
  '[Task] update Task',
  props<{ request: TaskModel }>()
)

export const updateTaskSuccess = createAction(
  '[Task] update Task Success',
  props<{ response: ResponseModel<TaskModel> }>()
)

export const updateTaskFail = createAction(
  '[Task] Load Task Fail'
)
