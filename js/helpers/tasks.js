define(['./counter', './template', './storage'], function (counter, template, storage) {
    // Task constructor
    var Task = function (description, status) {
        this.description = description;
        if (status) {
          this.isComplete = status;
        } else {
          this.isComplete = false;
        }
    };
    var allTasks = [];
    if (storage.getData().length > 0) {
        storage.getData().forEach(function (item) {
            addNewTask(item.description, item.isComplete);
        })
    }
    function addNewTask(description, status) {
        var newTask;
        var taskElement;
        // create HTML with template
        template(description);
        // Set task element and remove temp class
        taskElement = document.querySelector('.new-temporary-class');
        // Check status and set to complete if Complete
        if (status) {
            taskElement.classList.add('completed');
            taskElement.querySelector('.toggle').click();
        }
        document.querySelector('.new-temporary-class').classList.remove('new-temporary-class');
        // Add task to Array
        newTask = new Task(description, status);
        // Add to local Array with tasks
        allTasks.push(newTask);
        // Add events
        addDeleteHandler(newTask, taskElement);
        addEditHandler(newTask, taskElement);
        addSwitch(newTask, taskElement);
        // Update counter
        counter();
        // Update localSorage
        storage.saveData(allTasks);
    }
    function addDeleteHandler (item, element) {
        element.querySelector('.destroy').addEventListener('click', function () {
            removeTask(item, element);
        });
    }
    function addSwitch (item, element) {
        element.querySelector('.toggle').addEventListener('click', function () {
            changeStatus(item, element);
        });
    }
    function removeTask (item, element) {
        var temp = allTasks.indexOf(item)
        if (temp > -1) {
          // If item is on list remove it
            allTasks.splice(temp, 1);
        }
        // Remove item from DOM
        element.parentNode.removeChild(element);
        // Update counter
        counter();
        // Update localSorage
        storage.saveData(allTasks);
    }
    function changeStatus (item, element) {
        // Toggle clas 'completed' on task
        element.classList.toggle('completed');
        // change Status of element on Array
        item.isComplete = !item.isComplete;
        // update counter
        counter();
        // Update localSorage
        storage.saveData(allTasks);
    }
    function addEditHandler (item, element) {
        element.querySelector('label').addEventListener('dblclick', function () {
            editTask(item, element);
        })
    }
    function editTask (item, element) {
        element.classList.add('editing');
        // Focus the input
        element.querySelector('.edit').focus();
        // Save on /enter
        element.querySelector('.edit').addEventListener('keypress', function (e) {
            if (e.keyCode === 13) {
                // Set description to the input value
                item.description = e.target.value;
                // Set description in DOM
                element.querySelector('label').innerHTML = item.description;
                // Remove editing class
                element.classList.remove('editing');
                // Update localSorage
                storage.saveData(allTasks);
            }
        });
        element.querySelector('.edit').addEventListener('focusout', function (e) {
            item.description = e.target.value;
            element.querySelector('label').innerHTML = item.description;
            element.classList.remove('editing');
            // Update localSorage
            storage.saveData(allTasks);
        });
    }
    document.querySelector('.new-todo').addEventListener('keypress', function (e) {
        if (e.keyCode === 13) {
            addNewTask(e.target.value);
            e.target.value = '';
        }
    });
    return {
        add: addNewTask,
        remove: removeTask,
        edit: editTask,
        taskList: allTasks
    };
});
