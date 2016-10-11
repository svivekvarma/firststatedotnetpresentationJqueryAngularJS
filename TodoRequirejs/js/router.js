define(function () {
    var routes = [{ hash: '#list', controller: 'ListController' },
        { hash: '#add', controller: 'AddController' }];
    var defaultRoute = 'todolist';
    var currentHash = '';
    var started = false;
    var renderContainer = '#routeroutlet';
    var oldHash = '';

    function startRouting() {
        //   window.location.hash = window.location.hash || defaultRoute;
        navigate(defaultRoute, {});
    }

    function getUrlVars() {
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
            vars[key] = value;
        });
        return vars;
    }

    function parseParamsFromHash() {
        if (window.location.hash.split('?').length > 1) {

            var params = window.location.hash.split('?')[1].split('&').map(function (item) {
                return item.split('=');
            });
            var namedparams = {};

            for (i = -1; param = params[++i];) {
                namedparams[param[0]] = param[1];
            }
            return namedparams;
        } else {
            return {};
        }
    }

    function navigate(name, state) {
        if (!started) {
            // start responding to hash change
            $(window).on('hashchange', function () {
                var hash = "";
                if (window.location.hash.indexOf('?') > -1) {
                    hash = window.location.hash.split('#')[1].split('?')[0];
                } else {
                    hash = window.location.hash.split('#')[1];
                }

                if (!(hash === '' || hash === undefined)) {
                    if (!(hash === currentHash)) {
                        if (currentHash === '' || currentHash === undefined) { currentHash = 'todolist' }
                        oldHash = currentHash;
                        currentHash = hash;
                        if (oldHash === currentHash) {
                            oldHash = '';
                        }
                        loadComponent(currentHash, parseParamsFromHash());
                    }
                }
            });
            $(window).trigger('hashchange');
            //window.location.hash = defaultRoute;
            //currentHash = defaultRoute;
            //loadController(name, state);
            started = true;

        } else {
            var hash = "";
            if (window.location.hash.indexOf('?') > -1) {
                hash = window.location.hash.split('#')[1].split('?')[0];
            } else {
                hash = window.location.hash.split('#')[1];
            }


            if (!(hash === currentHash)) {
                oldHash = currentHash;
                currentHash = hash;
                if (oldHash === currentHash) {
                    oldHash = '';
                }
                loadComponent(name, state);
            }
        }
    }

    function loadComponent(componentName, params) {
        require(['js/pagewidgets/' + componentName], function (component) {
            component.render(params, renderContainer, currentHash, oldHash);
        }, function (err) {
            console.log(err);
        });
    }

    return {
        startRouting: startRouting,
        navigateTo: navigate
    };
});