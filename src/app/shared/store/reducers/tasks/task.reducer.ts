import { Action, createReducer, on } from '@ngrx/store';
import * as TaskActions from '../../actions/tasks/task.actions';
import { ResponseModel } from '../../../models/response.model';
import { TaskModel } from '../../../models/tasks/task.model';
import { BoardModel } from '../../../models/boards/board.model';



export const TaskFetureKey = 'Task';

export interface TaskState {
  createTaskResponse: ResponseModel<BoardModel[]> | undefined;
  loadTask: ResponseModel<TaskModel> | undefined;
  updateTask: ResponseModel<BoardModel[]> | undefined;
}

export const initialTaskState: TaskState = {
  createTaskResponse: undefined,
  loadTask: undefined,
  updateTask: undefined,
};

export const TaskReducer = createReducer(
  initialTaskState,
    on(TaskActions.clearStoreFlags, (state: TaskState) => ({
        ...state,
        createTaskResponse: undefined,
        loadTask: undefined,
        updateTask: undefined,
    })),

    // Create Task
    on(TaskActions.createTask, (state: TaskState) => ({
        ...state,
        createTaskResponse: undefined
    })),
    on(TaskActions.createTaskSuccess, (state: TaskState, { response }) => ({
        ...state,
        createTaskResponse: response
    })),
    on(TaskActions.createTaskFail, (state: TaskState) => ({
        ...state,
        createTaskResponse: undefined
    })),

    // Load Task
    on(TaskActions.loadTask, (state: TaskState) => ({
      ...state,
      loadTask: undefined
    })),
    on(TaskActions.loadTaskSuccess, (state: TaskState, { response }) => ({
        ...state,
        loadTask: response
    })),
    on(TaskActions.loadTaskFail, (state: TaskState) => ({
        ...state,
        loadTask: undefined
    })),

    // Update Task
    on(TaskActions.updateTask, (state: TaskState) => ({
      ...state,
      updateTask: undefined
    })),
    on(TaskActions.updateTaskSuccess, (state: TaskState, { response }) => ({
      ...state,
      updateTask: response
    })),
    on(TaskActions.updateTaskFail, (state: TaskState) => ({
      ...state,
      updateTask: undefined
    })),

);

export function TaskReducerFunc(
    state: TaskState | undefined,
    action: Action
): any {
    return TaskReducerFunc(state, action);
}

