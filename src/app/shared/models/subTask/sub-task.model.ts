export interface ISubTaskModel {
  id: string;
  description: string;
  status: boolean;
}

export class SubTaskModel implements ISubTaskModel {
  id!: string;
  description!: string;
  status!: boolean;
}
