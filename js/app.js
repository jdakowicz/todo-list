define(function (require) {
    var counter = require('./helpers/counter');
    var filters = require('./helpers/filter');
    var tasks = require('./helpers/tasks');

    tasks.add('item 1');
    tasks.add('item 2');
    tasks.add('item 3');

    // initiate filters
    filters();
});
