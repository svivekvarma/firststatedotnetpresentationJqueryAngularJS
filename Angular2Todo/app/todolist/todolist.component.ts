import {Component, Input, Output} from '@angular/core';
import {TodoListService} from '../services/TodoList.service';
import { NgFor } from '@angular/common';
import {HTTP_PROVIDERS} from '@angular/http';
import { Router }  from '@angular/router';
import {Observable} from 'rxjs/rx';
import {Todo} from '../models/todo';

@Component({
    selector: 'todolist',
    templateUrl: './app/todolist/todolist.html',
    styleUrls: ['./app/todolist/todolist.css'],
    providers: [TodoListService, HTTP_PROVIDERS],
    directives: [NgFor]
})
export class TodoListComponent { 
    todos: Todo[] = [];   
    constructor(  private router: Router,
        private _todoListService: TodoListService) {
        this._todoListService = _todoListService;
        var subscription = this._todoListService.getTodos();
        subscription.subscribe(todos => this.filtertodos(todos));
    }

    filtertodos(todos:Todo[]){
        this.todos = todos.filter(t => t.Checked === false);
    }

    markcompleted(todo: Todo){
       console.log(todo);
       todo.Checked = true;
       var subscription = this._todoListService.updateTodo(todo);
       subscription.subscribe(result => this._todoListService.getTodos().toPromise().then(todos => this.filtertodos(todos)));      
    }

    deletetodo(todo: Todo){
       console.log(todo);
       var subscription = this._todoListService.deleteTodo(todo);
       subscription.subscribe(result => this._todoListService.getTodos().toPromise().then(todos => this.filtertodos(todos)));      
    }

    edittodo(todo: Todo){
       console.log(todo);
       this.router.navigate(['/edittodo', todo.ID]);
    }
    
    addtodo(){
       this.router.navigate(['/addtodo']);
    }
}
