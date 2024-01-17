import { BoardModel } from "../boards/board.model";

export interface IColumnModel {
  id: string;
  title: string;
  task_list: Array<BoardModel>;
}

export class ColumnModel implements IColumnModel {
  id!: string;
  title!: string;
  task_list!: Array<BoardModel>;
}
