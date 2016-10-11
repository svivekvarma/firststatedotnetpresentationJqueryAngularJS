import {Injectable} from '@angular/core';
import {Rx, Observable, Subscriber} from 'rxjs/rx';
//import * from 'rxjs/rx';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TodoListService {

    constructor(private _http: Http) {

    }

    getTodos() {

        // return this._http.get('./api/Todo/Get')
        //     .map(res => res.json());

        return Observable.from(JSON.parse(localStorage.getItem("todolist"))).toArray();
    }

    getTodo(id: any) {
        // return this._http.get('./api/Todo/Find/' + id)
        //     .map(res => res.json());

        let todos = JSON.parse(localStorage.getItem("todolist"));

        let todo = todos.filter(function (item) {
            return item.ID === id;
        });

        return Observable.from(todo);
    }
    updateTodo(todo: any) {

        // let body = JSON.stringify(todo);
        // let headers = new Headers({ 'Content-Type': 'application/json' });
        // let options = new RequestOptions({ headers: headers });

        // return this._http.put('./api/Todo/Edit', body, options)
        //     .map(res => res.json());

        let todos = JSON.parse(localStorage.getItem("todolist"));
        let i = 0;
        for (i = 0; i < todos.length; i++) {
            if (todos[i].ID === todo.ID) {
                todos[i] = todo;
            }
        }

        localStorage.setItem("todolist", JSON.stringify(todos));
        return Observable.from([todo]);
    }

    deleteTodo(todo: any) {

        // return this._http.delete('./api/Todo/Delete/' + todo["ID"])
        //     .map(res => res.json());

        let todos = JSON.parse(localStorage.getItem("todolist"));
        todos = todos.filter(function (item) {
            return item.ID !== todo.ID;
        });

        localStorage.setItem("todolist", JSON.stringify(todos));
        return Observable.from([todo]);
    }


    addTodo(todo: any) {

        // let body = JSON.stringify(todo);
        // let headers = new Headers({ 'Content-Type': 'application/json' });
        // let options = new RequestOptions({ headers: headers });

        // return this._http.post('./api/Todo/Add', body, options)
        //     .map(res => res.json());

        let todos = JSON.parse(localStorage.getItem("todolist"));

        todos.sort(function (a, b) { 
            return a.ID - b.ID
        });

        todo.ID = todos[todos.length-1].ID + 1;

        todos.push(todo);
        
        localStorage.setItem("todolist", JSON.stringify(todos));

        return Observable.from([todo]);        
    }
}