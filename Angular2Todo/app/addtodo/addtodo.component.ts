import {Component, OnInit, OnDestroy} from '@angular/core';
import {Todo} from '../models/todo'
import {TodoListService} from '../services/TodoList.service'
import { Router, ActivatedRoute }       from '@angular/router';
import { NgFor } from '@angular/common';
import {HTTP_PROVIDERS} from '@angular/http'
import {Observable} from 'rxjs/rx'

@Component({
    selector: 'addtodo',
    templateUrl: './app/addtodo/addtodo.html',
    styleUrls: ['./app/addtodo/addtodo.css'],
    providers: [TodoListService, HTTP_PROVIDERS],
    directives: [NgFor]
})
export class AddTodoComponent implements OnInit, OnDestroy {
    private todo: Todo;
    private sub: any;
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private service: TodoListService) {
        this.todo = { ID: 1, Desc: "", Checked: false };
    }

    ngOnInit() {

    }
    ngOnDestroy() {

    }
    gotoTodos() {
        if (this.todo.Desc !== "") {

            var subscription = this.service.addTodo(this.todo)
            subscription.subscribe(res => this.router.navigate(['/todolist']))
        }else{
            this.router.navigate(['/todolist']);
        }
    }

}
