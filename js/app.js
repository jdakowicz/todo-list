define(function (require) {
    var counter = require('./helpers/counter');
    var filters = require('./helpers/filter')
    // Task constructor
    var Task = function (description, element) {
        this.description = description;
        this.isComplete = false;
        this.element = element;
        console.log(this);
    }

    // count items after page load and update counter
    counter();
    filters();

    // test of counter
    // setTimeout(function () {
    //
    //     document.querySelector('.todo-list').innerHTML += '<li></li><li class="completed"></li>';
    //     counter();
    // }, 500)

});
