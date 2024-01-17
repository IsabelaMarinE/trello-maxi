import { TaskModel } from "../tasks/task.model";

export interface ICreateBoardModel {
  id: string;
  title: string;
}

export class CreateBoardModel implements ICreateBoardModel {
  id!: string;
  title!: string;
}
