import { ColumnModel } from "../columns/column.model";


export interface IBoardModel {
  id: string;
  title: string;
  description: string;
  column_list: Array<ColumnModel>;
}

export class BoardModel implements IBoardModel {
  id!: string;
  title!: string;
  description!: string;
  column_list!: Array<ColumnModel>;
}
