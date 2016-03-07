define(['./counter', './template'], function (counter, template) {
  // Task constructor
  var Task = function (description, element) {
      this.description = description;
      // this.isComplete = false;
      this.element = element;
  };
  var allTasks = [];
  function addNewTask(description) {
    var newTask;
    // create HTML with template
    template(description);
    // Add task to Array
    newTask = new Task(description, document.querySelector('.new-temporary-class'));
    // Remove temporary class
    document.querySelector('.new-temporary-class').classList.remove('new-temporary-class');
    // Add to local Array with tasks
    allTasks.push(newTask);
    // Add events
    addDeleteHandler(newTask);
    addEditHandler(newTask);
    addSwitch(newTask.element);
    counter();

  }
  function addDeleteHandler (item) {
    item.element.querySelector('.destroy').addEventListener('click', function () {
      removeTask(item);
    });
  }
  function addSwitch (element) {
    element.querySelector('.toggle').addEventListener('click', function () {
      changeStatus(element);
    });
  }
  function removeTask (item) {
    var temp = allTasks.indexOf(item)
    if (temp > -1) {
        allTasks.splice(temp, 1);
    }
    // Remove item from DOM
    item.element.parentNode.removeChild(item.element);
    // Update counter
    counter();
  }
  function changeStatus (item) {
    // Toggle clas 'completed' on task
    item.classList.toggle('completed');
    // update counter
    counter();
  }
  function addEditHandler (item) {
    item.element.querySelector('label').addEventListener('dblclick', function () {
      editTask(item);
    })
  }
  function editTask (item) {
    item.element.classList.add('editing');
    // Focus the input
    item.element.querySelector('.edit').focus();
    // Save on /enter
    item.element.querySelector('.edit').addEventListener('keypress', function (e) {
      if (e.keyCode === 13) {
        // Set description to the input value
        item.description = e.target.value;
        // Set description in DOM
        item.element.querySelector('label').innerHTML = item.description;
        // Remove editing class
        item.element.classList.remove('editing');
      }
    });
    item.element.querySelector('.edit').addEventListener('focusout', function (e) {
      item.description = e.target.value;
      item.element.querySelector('label').innerHTML = item.description;
      item.element.classList.remove('editing');
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
    taskList: allTasks,
    print: function () {
      console.table(allTasks);
    }
  };
});
