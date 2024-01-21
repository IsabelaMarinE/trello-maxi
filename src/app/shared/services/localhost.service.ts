import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { BoardModel } from '../models/boards/board.model';
import { ColumnModel } from '../models/columns/column.model';
import { ResponseModel } from '../models/response.model';

@Injectable({
    providedIn: 'root',
})
export class LocalHostService {

  private columns: ColumnModel[] = [{
    id: uuidv4(),
    title: 'To Do',
    task_list: []
  }]

  private Board: BoardModel = {
    id: uuidv4(),
    title: 'Home',
    description: 'Init Tasks',
    column_list: this.columns
  }

  private Boards: BoardModel[] = [
    this.Board
  ];

  constructor() {
  }

  initProject(): Promise<ResponseModel<BoardModel[]>> {
    const response = new ResponseModel<BoardModel[]>
    return new Promise((resolve, reject) => {
      try {
        localStorage.setItem("boards", JSON.stringify(this.Boards));
        response.items = [this.Boards];
        response.error = '';
        response.state = true;
        resolve(response);
      } catch (err: any) {
        response.items = [];
        response.error = err;
        response.state = false;
        reject(response);
      }
    })
  }

  addNewboard(request: BoardModel): Promise<BoardModel> {
    try {
      this.Boards = JSON.parse(localStorage.getItem("boards") || '');
      this.Boards.push(request);
      localStorage.setItem("boards", JSON.stringify(this.Boards));
      return new Promise((resolve, reject) => {
        if(this.Boards){
          resolve(this.Board)
        }
        reject(new Error("Problem on create new Board"))
      })
    } catch (error) {
      throw new Error("Error on Load Board")
    }
  }

  loadBoardById(id: string): Promise<ResponseModel<BoardModel>> {
    const response = new ResponseModel<BoardModel>
    return new Promise((resolve, reject) => {
      try {
        const board = this.Boards.find((element) => element.id == id);
        if(board){
          response.items = [board];
          response.error = '';
          response.state = true;
          resolve(response);
        }
        response.items = [];
        response.error = 'Board Not Found';
        response.state = false;
        reject(response);
      } catch (err:any) {
        response.items = [];
        response.error = err;
        response.state = false;
        reject(response);
      }
    })

  }

  loadBoards(): Promise<ResponseModel<BoardModel[]>> {
    const response = new ResponseModel<BoardModel[]>
    return new Promise((resolve, reject) => {
      try {
        if(this.Boards.length > 0){
          response.items = [this.Boards];
          response.error = '';
          response.state = true;
          resolve(response);
        }
        response.items = [];
        response.error = 'Boards Not Found';
        response.state = false;
        reject(response);
      } catch (err:any) {
        response.items = [];
        response.error = err;
        response.state = false;
        reject(response);
      }
    })

  }

}
