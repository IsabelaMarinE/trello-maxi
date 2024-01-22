import { SubTaskModel } from "../subTask/sub-task.model";

export interface ITaskModel {
  id: string;
  description: string;
  title: string;
  id_column: string;
  sub_tasks: SubTaskModel[];
}

export class TaskModel implements ITaskModel {
  id!: string;
  description!: string;
  title!: string;
  id_column!: string;
  sub_tasks!: SubTaskModel[];
}
