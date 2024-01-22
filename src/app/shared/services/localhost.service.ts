import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { BoardModel } from '../models/boards/board.model';
import { ColumnModel } from '../models/columns/column.model';
import { ResponseModel } from '../models/response.model';
import { TaskModel } from '../models/tasks/task.model';

@Injectable({
    providedIn: 'root',
})
export class LocalHostService {

  private Board: BoardModel = {
    id: uuidv4(),
    title: 'Home',
    description: 'Init Tasks',
    column_list: []
  }

  private columns: ColumnModel = {
    id: uuidv4(),
    id_board: this.Board.id,
    title: 'To Do',
    task_list: []
  };


  private Boards: BoardModel[] = [
    this.Board
  ];

  constructor() {
    this.Board.column_list.push(this.columns);
  }

  /*
  Init Services of Board
  */
  addNewboard(request: BoardModel): Promise<ResponseModel<BoardModel>> {
    const response = new ResponseModel<BoardModel>;
    try {
      this.Boards = JSON.parse(localStorage.getItem("boards") || '');
      this.Boards.push(request);
      localStorage.setItem("boards", JSON.stringify(this.Boards));
      return new Promise((resolve, reject) => {
        if(this.Boards){
          response.items = this.Boards;
          response.error = '';
          response.state = true;
          resolve(response);
        }
        reject(new Error("Problem on create new Board"))
      })
    } catch (error) {
      throw new Error("Error on Load Board")
    }
  }

  loadBoardById(id: string): Promise<ResponseModel<BoardModel>> {
    const response = new ResponseModel<BoardModel>;
    return new Promise((resolve, reject) => {
      try {
        const board = this.Boards.find((element) => element.id == id);
        if(board){
          response.items = [board];
          response.error = '';
          response.state = true;
          resolve(response);
        }
      } catch (err:any) {
        response.items = [];
        response.error = err;
        response.state = false;
        reject(response);
      }
    })

  }

  loadBoards(): Promise<ResponseModel<BoardModel>> {
    const response = new ResponseModel<BoardModel>
    return new Promise((resolve, reject) => {
      try {
        if(this.Boards.length == 1){
          localStorage.setItem("boards", JSON.stringify(this.Boards));
        }else{
          this.Boards = JSON.parse(localStorage.getItem("boards") || '');
        }
        response.items = this.Boards;
        response.error = '';
        response.state = true;
        resolve(response);
      } catch (err:any) {
        response.items = [];
        response.error = err;
        response.state = false;
        reject(response);
      }
    })

  }
  /*
  Finish Services of Board
  */

  /*
  Init Services of Columns
  */
  createColumn(request: ColumnModel): Promise<ResponseModel<ColumnModel[]>> {
    const response = new ResponseModel<ColumnModel[]>
    return new Promise((resolve, reject) => {
      try {
        this.Boards = JSON.parse(localStorage.getItem("boards") || '');
        const index = this.Boards.findIndex((element) => element.id == request.id_board);
        this.Boards[index].column_list.push(request);
        localStorage.setItem("boards", JSON.stringify(this.Boards));
        response.items = [this.Boards[index].column_list];
        response.error = '';
        response.state = true;
        resolve(response);
      } catch (err:any) {
        response.items = [];
        response.error = err;
        response.state = false;
        reject(response);
      }
    })

  }

  getAllColumns(id_board: string): Promise<ResponseModel<ColumnModel[]>>{
    const response = new ResponseModel<ColumnModel[]>
    return new Promise((resolve, reject) => {
      try {
        this.Boards = JSON.parse(localStorage.getItem("boards") || '');
        const index = this.Boards.findIndex((element) => element.id == id_board);
        this.Boards[index].column_list;
        response.items = [this.Boards[index].column_list];
        response.error = '';
        response.state = true;
        resolve(response);
      } catch (err:any) {
        response.items = [];
        response.error = err;
        response.state = false;
        reject(response);
      }
    })
  }
 /*
  Finish Services of Columns
  */

  /*
  Init Services of Tasks
  */
  createTask(request: TaskModel): Promise<ResponseModel<TaskModel[]>> {
    const response = new ResponseModel<TaskModel[]>
    return new Promise((resolve, reject) => {
      try {
        this.Boards = JSON.parse(localStorage.getItem("boards") || '');
        const columnList = this.Boards.find((element) => element.column_list.find((item) => item.id == request.id_column));
        console.log("columnList",columnList)
        response.items = [];
        response.error = '';
        response.state = true;
        resolve(response);
      } catch (err:any) {
        response.items = [];
        response.error = err;
        response.state = false;
        reject(response);
      }
    })

  }
 /*
  Finish Services of Task
  */

}
