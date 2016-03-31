define(['./counter', './template', './storage'], function (counter, template, storage) {
    // Task constructor
    var Task = function (description, status) {
            this.description = description;
            this.isComplete = status || false;
        },
        allTasks = [];

    function removeTask (item, element) {
        var temp = allTasks.indexOf(item);

        if (temp > -1) {
            // If item is on list remove it
            allTasks.splice(temp, 1);
        }
        // Remove item from DOM
        element.parentNode.removeChild(element);
        // Update counter
        counter.update();
        // Update localSorage
        storage.saveData(allTasks);
    }
    function addDeleteHandler (item, element) {
        element.querySelector('.destroy').addEventListener('click', function () {
            removeTask(item, element);
        });
    }
    function changeStatus (item, element, isClicked) {
        // Toggle class 'completed' on task
        element.classList.toggle('completed');
        if (!isClicked) {
            element.querySelector('.toggle').checked = !element.querySelector('.toggle').checked;
        }
        // change Status of element on Array
        item.isComplete = !item.isComplete;
        // update counter
        counter.update();
        // Update localSorage
        storage.saveData(allTasks);
    }
    function addSwitch (item, element) {
        element.querySelector('.toggle').addEventListener('click', function () {
            changeStatus(item, element, true);
        });
    }
    function editContent (item, element, event) {
        // Set description to the input value
        item.description = event.target.value = event.target.value.trim();
        // Set description in DOM
        element.querySelector('label').innerText = item.description;
        // Remove editing class
        element.classList.remove('editing');
        // Update localSorage
        storage.saveData(allTasks);
    }
    function editTask (item, element) {
        var editItem = element.querySelector('.edit');
        element.classList.add('editing');
        // Focus the input
        editItem.focus();
        // Save on /enter
        editItem.addEventListener('keypress', function (e) {
            if (e.keyCode === 13) {
                editContent(item, element, e);
            }
        });
        editItem.addEventListener('focusout', function (e) {
            editContent(item, element, e);
        });
    }
    function addEditHandler (item, element) {
        element.querySelector('label').addEventListener('dblclick', function () {
            editTask(item, element);
        });
    }
    function addItemHandlers (item, element) {
        addDeleteHandler(item, element);
        addEditHandler(item, element);
        addSwitch(item, element);
    }
    function prepareTask (desc, status) {
        var el;
        // create HTML with template
        template.create(desc);
        // set el as the freshly created element of html with temporary class
        el = document.querySelector('.new-temporary-class');
        // Check status and set to completed if it's completed (in case of loading from localStorage)
        if (status) {
            el.classList.add('completed');
            el.querySelector('.toggle').click();
        }
        // Remove tempporary class
        el.classList.remove('new-temporary-class');
        // Returns new task Element
        return el;
    }
    function addNewTask (description, status) {
        var newTask = new Task(description, status),
            taskElement = prepareTask(description, status);

        // Add to local Array with tasks
        allTasks.push(newTask);
        // Add events
        addItemHandlers(newTask, taskElement);
        // Update counter
        counter.update();
        // Update localSorage
        storage.saveData(allTasks);
    }
    _e('.new-todo').addEventListener('keypress', function (e) {
        if (e.keyCode === 13) {
            addNewTask(e.target.value.trim());
            e.target.value = '';
        }
    });
    if (storage.getData().length > 0) {
        storage.getData().forEach(function (item) {
            addNewTask(item.description, item.isComplete);
        });
    }
    return {
        add: addNewTask,
        remove: removeTask,
        edit: editTask,
        taskList: allTasks,
        change: changeStatus
    };
});
