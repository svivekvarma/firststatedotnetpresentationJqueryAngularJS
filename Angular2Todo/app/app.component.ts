import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import {TodoListComponent} from './todolist/todolist.component';
import {Todo} from './models/todo';

@Component({
    selector: 'my-app',
    templateUrl: './app/app.html',
    styleUrls: ['./app/app.css'],
    directives: [ROUTER_DIRECTIVES, TodoListComponent]
})

export class AppComponent implements OnInit {
    private title = 'Todo App';
    private _todos =[]; 
    ngOnInit() {
        console.log("On Init");
        this._todos.push({ ID: 1, Desc: "Cleanup Garage", Checked: false });
        this._todos.push({ ID: 2, Desc: "Setup Demo for FirstState .Net", Checked: true });
        this._todos.push({ ID: 2, Desc: "Blog about how javascript rocks !!", Checked: false });
        console.log(this._todos);
        localStorage.setItem("todolist", JSON.stringify(this._todos));
    }

    ngOnDestroy() {
        // Speak now or forever hold your peace
    }
    ngDoCheck() {
        // Custom change detection
    }
    ngOnChanges(changes) {
        // Called right after our bindings have been checked but only
        // if one of our bindings has changed.
        //
        // changes is an object of the format:
        // {
        //   'prop': PropertyUpdate
        // }
    }
    ngAfterContentInit() {
        // Component content has been initialized
    }
    ngAfterContentChecked() {
        // Component content has been Checked
    }
    ngAfterViewInit() {
        // Component views are initialized
    }
    ngAfterViewChecked() {
        // Component views have been checked
    }
}
