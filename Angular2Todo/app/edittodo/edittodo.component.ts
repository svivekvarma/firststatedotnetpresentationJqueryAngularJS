import {Component, OnInit, OnDestroy} from '@angular/core';
import {TodoListService} from '../services/TodoList.service';
import { Router, ActivatedRoute }       from '@angular/router';
import { NgFor } from '@angular/common';
import {HTTP_PROVIDERS} from '@angular/http';
import {Observable} from 'rxjs/rx';

@Component({
  selector: 'edittodo',
  templateUrl: './app/edittodo/edittodo.html',
  styleUrls: ['./app/edittodo/edittodo.css'],
  providers: [TodoListService, HTTP_PROVIDERS],
  directives: [NgFor]
})
export class EditTodoComponent implements OnInit, OnDestroy {
  private todo: any;
  private sub: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: TodoListService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      let id = +params['id']; // (+) converts string 'id' to a number
      this.service.getTodo(id).subscribe(data => this.todo = data);
    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  gotoTodos() {

    var subscription = this.service.updateTodo(this.todo).toPromise().then(
      resp => this.router.navigate(['/todolist'])
    )
    //subscription.subscribe(res => console.log(res));

  }
}
