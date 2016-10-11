define(['jquery',
    'handlebars',
    'js/services/todoservice',
    'js/vendor/text!js/pagewidgets/_edittodo.html'],
    function ($, Handlebars, todoservice, tmpl) {

        var _params = {};
        var _renderContainer = '';
        var _currentHash = '';
        var _oldHash = '';

        var parseOneZeroToBool = function (val, inputName) {
            if (inputName == "Checked") {
                if (val === "1") return true;
                if (val === "0") return false;
                return val;
            }
            return val;
        }

        function bindEvents() {
            $(_renderContainer + ' button.submit').on('click touchend', function () {

                var form1valid = $(_renderContainer + ' form').valid();

                if (form1valid) {
                    var form1 = $(_renderContainer + ' form');
                    var form1obj = form1.serializeJSON({ parseWithFunction: parseOneZeroToBool });
                    var req = todoservice.updateTodo(form1obj);
                    req.done(function () {
                        location.hash = '#todolist';
                    });

                    req.fail(function () {
                        console.log("Error saving the  todo");
                    });

                } else {

                }
            });
        };

        function unbindEvents() {
            $(_renderContainer + ' button.submit').off('click touchend');
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
                    return (parseInt(params["id"]) === n["ID"])
                })

                $(renderContainer).html(compiled({ oldHash: oldHash, viewHash: currentHash, model: filtereddata[0] }));
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