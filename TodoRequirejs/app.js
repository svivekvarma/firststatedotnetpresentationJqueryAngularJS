/*All 3rd party libraries are dropped in js/vendor folder and configured here for shorthand require callsreviews*/

requirejs.config({
    baseUrl: './',
    paths: {
        'text': 'js/vendor/text',
        'jquery': 'js/vendor/jquery/jquery.min',
        'respond': 'js/vendor/respond/dest/respond.min',
        'modernizer': 'js/vendor/modernizr',
        'html5shiv': 'js/vendor/html5shiv/html5shiv.min',
        'bootstrap': 'js/vendor/bootstrap/js/bootstrap.min',
        'bootstrap-switch': 'js/vendor/bootstrap-switch-master/dist/js/bootstrap-switch.min',
        'jqueryuiwidget': 'js/vendor/jqueryui/ui/widget',
        'fastclick': 'js/vendor/fastclick/fastclick',
        'hammerjs': 'js/vendor/hammerjs/hammer.min',
        'hammerjquery': 'js/vendor/jqueryhammer/jquery.hammer',
        'slideoutmenu': 'js/vendor/vwidgets/slideoutmenu',
        'pageloader': 'js/vendor/vwidgets/pageloader',
        'jquery-cookie': 'js/vendor/jquery-cookie/src/jquery.cookie',
        'jquery-validate': 'js/vendor/jquery-validate/jquery.validate.min',
        'jquery-validate.additionalmethods': 'js/vendor/jquery-validate/additional-methods.min',
        'jquery-serializeJSON': 'js/vendor/jqueryserializeJSON/jquery.serializejson.min',
        'jqueryformparams': 'js/vendor/jquerypp-2.0.0/dist/amd/dom/form_params/form_params',
        'underscore': 'js/vendor/underscore-min',
        'mustache': 'js/vendor/mustache/mustache.min',
        'handlebars': 'js/vendor/handlebars/handlebars-v3.0.3',
        'jsPDF': 'js/vendor/jsPDF-0.9.0rc2/dist/jspdf.amd.min',
        'moment': 'js/vendor/moment/min/moment.min',
        'router': 'js/router',
        'animator': 'js/animator',
        'vOverlay': 'js/vendor/vOverlay/voverlay'
    },
    shim: {
        'jquery': {
            exports: ['$']
        },
        'bootstrap': {
            deps: ['jquery']
        },
        'hammerjquery': {
            deps: ['jquery', 'hammerjs']
        },
        'jqueryuiwidget': {
            deps: ['jquery']
        },
        'slideoutmenu': {
            deps: ['jquery', 'jqueryuiwidget', 'hammerjquery']
        },
        'pageloader': {
            deps: ['jquery', 'jqueryuiwidget', 'hammerjquery']
        },
        'jquery-cookie': {
            deps: ['jquery']
        },
        'jquery-validate': {
            deps: ['jquery']
        },
        'jquery-validate.additionalmethods': {
            deps: ['jquery', 'jquery-validate']
        },
        'jquery-serializeJSON': {
            deps: ['jquery']
        },
        'animator': {
            deps: ['jquery']
        },
        'jqueryformparams': {
            deps: ['jquery']
        },
        'bootstrap-switch': {
            deps: ['jquery', 'bootstrap']
        },
        'jsPDF': {
            exports: ['jsPDF']
        },
        'vOverlay': {
            deps: ['jquery']
        }
    }
});

/*This is the starting point of the app , The main.js is being called from here*/
require(['js/router',
    'jquery',
    'underscore',
    'fastclick',
    'jqueryuiwidget',
    'slideoutmenu',
    'pageloader',
    'moment',
    'modernizer',
    'jquery-cookie',
    'jquery-validate',
    'jquery-validate.additionalmethods',
    'jquery-serializeJSON',
    'jqueryformparams',
    'vOverlay',
    'respond',
    'html5shiv',
    'bootstrap',
    'bootstrap-switch',
    'handlebars',
    'js/vendor/text'], function (Router, $, _, FastClick, jqueryuiwidget, slideoutmenu, pageloader, moment, modernizer) {

        localStorage.clear();

        // Attach Fastclick to drop the 300 ms
        FastClick.attach(document.body);
        var todos =[];

        todos.push({ ID: 1, Desc: "Cleanup Garage", Checked: false });
        todos.push({ ID: 2, Desc: "Setup Demo for FirstState .Net", Checked: false });
        todos.push({ ID: 3, Desc: "Blog about how javascript rocks !!", Checked: false });
        
        console.log(todos);
        
        localStorage.setItem("todolist", JSON.stringify(todos));

        Router.startRouting();
        location.hash = '#todolist';
    });

