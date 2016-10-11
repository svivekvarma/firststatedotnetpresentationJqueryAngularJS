import { provideRouter, RouterConfig }  from '@angular/router';
import { TodoListComponent } from './todolist/todolist.component';
import { EditTodoComponent } from './edittodo/edittodo.component';
import { AddTodoComponent } from './addtodo/addtodo.component';

const routes: RouterConfig = [
  {
    path: 'todolist',
    component: TodoListComponent
  },
  {
    path: '',
    component: TodoListComponent
  },
  { 
    path: 'edittodo/:id', 
    component: EditTodoComponent 
  },
  { 
    path: 'addtodo', 
    component: AddTodoComponent 
  }
];

export const appRouterProviders = [
  provideRouter(routes)
];