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
  private idBoard = uuidv4();
  private isEdited = false;
  private columns: ColumnModel = {
    id: uuidv4(),
    id_board: this.idBoard,
    title: 'To Do',
    task_list: []
  };

  private Board: BoardModel = {
    id: this.idBoard,
    title: 'Home',
    description: 'Init Tasks',
    column_list: [this.columns]
  }

  private Boards: BoardModel[] = [
    this.Board
  ];

  private taskList: TaskModel[] = [];

  constructor() {}

  /*
  Init Services of Board
  */
  addNewboard(request: BoardModel): Promise<ResponseModel<BoardModel>> {
    const response = new ResponseModel<BoardModel>;
    try {
      this.Boards = JSON.parse(localStorage.getItem("boards") || '');
      this.Boards.push(request);
      localStorage.setItem("boards", JSON.stringify(this.Boards));
      this.isEdited = true;
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
        if(this.Boards.length == 1 && !this.isEdited){
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
        this.isEdited = true;
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
  createTask(request: TaskModel): Promise<ResponseModel<BoardModel[]>> {
    const response = new ResponseModel<BoardModel[]>
    return new Promise((resolve, reject) => {
      try {
        this.Boards = JSON.parse(localStorage.getItem("boards") || '');
        let columnList: any = this.Boards.map((element) => [element.id, element.column_list.filter((item) => { return item.id == request.id_column})]);
        columnList[0][1][0].task_list.push(request);
        this.taskList.push(request);
        localStorage.setItem("boards", JSON.stringify(this.Boards));
        this.isEdited = true;
        response.items = [this.Boards];
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

  getTaskById(id: string): Promise<ResponseModel<TaskModel>> {
    const response = new ResponseModel<TaskModel>
    return new Promise((resolve, reject) => {
      try {
        const task = this.taskList.find((task) => task.id == id);
        response.items = [task!];
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
