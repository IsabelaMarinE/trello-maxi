import { TaskModel } from "../tasks/task.model";

export interface IColumnModel {
  id: string;
  title: string;
  task_list: Array<TaskModel>;
}

export class ColumnModel implements IColumnModel {
  id!: string;
  title!: string;
  task_list!: Array<TaskModel>;
}
