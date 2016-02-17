function task(id, description, removeButton, changeStatusButton) {
    this.id = id;
    this.isComplete = false;
    this.description = description;
    this.obj = removeButton.parentElement.parentElement;
    this.removeButton = removeButton;
    this.changeStatusButton = changeStatusButton;
}

var tasks = [];
tasks.push(new task(setId(), 'desc1', document.getElementsByClassName('task')[0].children[0].children[3], document.getElementsByClassName('task')[0].children[0].children[1]));
tasks.push(new task(setId(), 'desc2', document.getElementsByClassName('task')[1].children[0].children[3], document.getElementsByClassName('task')[1].children[0].children[1]));
// console.log(tasks);
// console.warn(tasks[0]);
function setId () {
    var i = 0,
        found = false,
        tempFound = false;

    if (!tasks.length) {
        return i;
    }
    function isFound (item) {
        if (item.id === i) {
            tempFound = true;
        }
    }
    while (!found) {
        tempFound = false;
        tasks.forEach(isFound);
        if (tempFound) {
            i++;
        } else {
            found = true;
        }
    }
    return i;
}
function addEvents(item) {
    item.changeStatusButton.addEventListener('click', function (e) {
        if (contains(item.obj.classList, 'complete')) {
            item.obj.classList.remove('complete');
        } else {
            item.obj.classList.add('complete');
        }
    });
    item.removeButton.addEventListener('click', function (e) {
        e.preventDefault();
        console.log('before', tasks)
        item.obj.remove();
        tasks.splice(tasks.indexOf(item), 1);
        console.log('after', tasks);
    });
}
var taskHTML = '<li class="task">' +
    '<div class="item">' +
        '<span class="icon icon--status task__label">Status</span>' +
        '<input type="checkbox" name="task_status" checked="checked" class="task__status">' +
        '<p class="task__description"></p>' +
        '<a href="#/delete" class="icon icon--delete task__delete">Delete task</a>' +
    '</div>' +
    '<input type="text" name="task_edit" class="task__edit">' +
'</li>';
function contains (where, whatItem) {
    var i;
    for (i = 0; i < where.length; i++) {
        if (where[i] === whatItem) {
            return true;
        }
    }
    return false;
}
tasks.forEach(addEvents);
console.table(tasks);
