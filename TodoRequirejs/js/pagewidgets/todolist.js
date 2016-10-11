define(['jquery',
    'handlebars',
    'js/services/todoservice',
    'js/vendor/text!js/pagewidgets/_todo.html'],
    function ($, Handlebars, todoservice, tmpl) {

        var _params = {};
        var _renderContainer = '';
        var _currentHash = '';
        var _oldHash = '';
        var _filtereddata = [];

        function bindEvents() {
            $(_renderContainer + ' button.markcompleted').on('click touchend', function () {
                var id = parseInt($(this).attr('data-id'));
                var todo = $.grep(_filtereddata, function (n, i) {
                    return (n["ID"] === id)
                });

                todo[0]["Checked"] = true;

                var p = todoservice.updateTodo(todo[0]);
                p.done(function (data) {
                    _render();
                });
            });

            $(_renderContainer + ' button.deletetodo').on('click touchend', function () {

                var id = parseInt($(this).attr('data-id'));

                var todo = $.grep(_filtereddata, function (n, i) {
                    return (n["ID"] === id)
                });

                    
                var p = todoservice.deleteTodo( todo[0]);

                p.done(function (data) {
                    _render();
                });
            });
        };


        function unbindEvents() {
            $(_renderContainer + ' button.markcompleted').off('click touchend');
            $(_renderContainer + ' button.deletetodo').off('click touchend');
        }

        function _render() {
            render(_params, _renderContainer, _currentHash, _oldHash);
        }

        function render(params, renderContainer, currentHash, oldHash) {
            _params = params;
            _renderContainer = renderContainer;
            _currentHash = currentHash;
            _oldHash = oldHash;

            var compiled = Handlebars.compile(tmpl);

            var req = todoservice.getTodos();

            

            req.done(function (data) {
                var filtereddata = $.grep(data, function (n, i) {
                    return (n["Checked"] === false);
                });

                _filtereddata = filtereddata;//filtereddata;

                $(renderContainer).html(compiled({ oldHash: oldHash, viewHash: currentHash, model: filtereddata }));
                bindEvents();
            });
        }

        function destroy() {
            unbindEvents();
        }

        return {
            render: render,
            destroy: destroy
        };
    });