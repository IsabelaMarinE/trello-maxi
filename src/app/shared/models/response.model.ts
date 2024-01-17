export interface IResponseModel<T> {
  items: T[];
  state: boolean;
  error: string;
}

export class ResponseModel<T> implements IResponseModel<T>{
  items!: T[];
  state!: boolean;
  error!: string;
}
