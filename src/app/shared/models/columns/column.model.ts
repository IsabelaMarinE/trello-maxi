import { TaskModel } from "../tasks/task.model";

export interface IColumnModel {
  id: string;
  id_board: string;
  title: string;
  task_list: Array<TaskModel>;
}

export class ColumnModel implements IColumnModel {
  id!: string;
  id_board!: string;
  title!: string;
  task_list!: Array<TaskModel>;
}
