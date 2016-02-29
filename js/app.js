define(function (require) {
    // Load any app-specific modules
    // with a relative require call,
    // like:
    var ops = require('./helpers/operations');
    var tasks = require('./helpers/task');

    // var newTask = new tasks.Task(tasks.setId(), 'testo');
    console.log(tasks);
    // console.log(newTask);

    // Load library/vendor modules using
    // full IDs, like:
    // var print = require('print');

    ops.print('koko');
});
