define(['jquery'],
    function ($) {

        function getTodos() {
            //return $.get('/js/services/todo.json');
            var p = $.Deferred();
            p.resolve(JSON.parse(localStorage.getItem("todolist")));
            return p;
        }

        function getTodo(id) {
            // return $.get('/api/Todolist');
            var p = $.Deferred();

            var todos = JSON.parse(localStorage.getItem("todolist"));

            var todo = todos.filter(function (item) {
                return item.ID === id;
            });
            p.resolve(todo);
            return p;
        }

        function updateTodo(todo) {

            // var p = $.ajax({
            //     url: '/api/Todo/Edit',
            //     type: 'PUT',
            //     data: JSON.stringify(todo),
            //     contentType: 'application/json;charset=utf-8'
            // });

            // return p;

            todo.ID = parseInt(todo.ID);

            if (todo.Checked === "false") {
                todo.Checked = false;
            } else {
                todo.Checked = true;
            }
            var p = $.Deferred();

            let todos = JSON.parse(localStorage.getItem("todolist"));
            let i = 0;
            for (i = 0; i < todos.length; i++) {
                if (todos[i].ID === todo.ID) {
                    todos[i] = todo;
                }
            }

            localStorage.setItem("todolist", JSON.stringify(todos));

            p.resolve(todos);

            return p;
        }

        function deleteTodo(todo) {
            // var p = $.ajax({
            //     method: "DELETE",
            //     url: '/api/Todo/Delete/' + todo["id"]
            // });
            // return p;

            var p = $.Deferred();

            let todos = JSON.parse(localStorage.getItem("todolist"));
            todos = todos.filter(function (item) {
                return item.ID !== todo.ID;
            });

            localStorage.setItem("todolist", JSON.stringify(todos));
            p.resolve(todo);
            return p;

        }

        function addTodo(todo) {

            var p = $.Deferred();

            let todos = JSON.parse(localStorage.getItem("todolist"));

            todos.sort(function (a, b) {
                return a.ID - b.ID
            });

            todo.ID = todos[todos.length - 1].ID + 1;

            todos.push(todo);

            localStorage.setItem("todolist", JSON.stringify(todos));

            p.resolve(todo);

            return p;
        }

        return {
            getTodos: getTodos,
            getTodo: getTodo,
            updateTodo: updateTodo,
            deleteTodo: deleteTodo,
            addTodo: addTodo
        };
    });