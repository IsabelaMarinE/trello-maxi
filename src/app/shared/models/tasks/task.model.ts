import { SubTaskModel } from "../subTask/sub-task.model";

export interface ITaskModel {
  id: string;
  description: string;
  status: string;
  list_sub_task: Array<SubTaskModel>;
}

export class TaskModel implements ITaskModel {
  id!: string;
  description!: string;
  status!: string;
  list_sub_task!: Array<SubTaskModel>;
}
