(function (window) {
    'use strict';

	// Variables
    var storage;
    var classEdit = 'edit';
    var classComplete = 'complete';
    var classList = 'list-todo';
    var classNew = 'add-panel__new';
    var classFilters = 'filters__list';
    var classClear = 'filters__clear';
    var classSingular = 'summary__text';
    var classSummaryNum = 'summary__count';
    var classCheckbox = 'task__status';
    var classDelete = 'task__delete';

    var header = document.getElementsByTagName('header')[0];
    var footer = document.getElementsByTagName('footer')[0];
    var main = getElement('main');
    var todoList = getElement(classList);
    var inputNew = getElement(classNew);
    var counter = getElement(classSummaryNum);
    var singular = getElement(classSingular);

    var template = loadTemplate();
    // !Variables

    // Functions

    // Check if localStorage exists and if it is get its content
    function checkLocalStorage () {
        if (window.localStorage.list.length > 0) {
            storage = window.localStorage.list;
            console.warn('localStorage loaded!');
        } else {
            console.warn('localStorage is empty!');
        }
    }
    function saveLocalStorage () {
        window.localStorage.list = storage;
    }
    function clearLocalStorage () {
        window.localStorage.removeItem('list');
    }
    // END of localStorage


    // Get Array of elements with specific class name
    function getElement (classname) {
        return document.getElementsByClassName(classname.trim())[0];
    }
    // Get Array of class names of element
    function getClasses (element) {
        return element.classList;
    }
    // Checks if element has that class
    function hasClass (element, classname) {
        getClasses(element).forEach(function (item, index) {
            if (item === classname) {
                return index;
            }
        });
        return false;
    }
    // Add class to element if it doesn't has it already
    function addClass (element, classname) {
        element.classList.add(classname.trim());
    }
    // todo
    function removeClass (element, classname) {
        element.classList.remove(classname.trim());
    }
    function contains (where, whatItem) {
        var i;
        for (i = 0; i < where.length; i++) {
            if (where[i] === whatItem) {
                return true;
            }
        }
        return false;
    }
    function toggleClass (element, classname) {
        if (contains(element.classList, classname)) {
            removeClass(element, classname);
        } else {
            addClass(element, classname);
        }
    }
    // Check if 'where' array contains 'whatItem'
    function getItemsCount () {
        return getElement(classList).children.length;
    }
    function getCompletedCount () {
        return document.getElementsByClassName(classComplete).length;
    }

    // Specific funcionality
    function loadTemplate () {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState === 4 && xhttp.status === 200) {
                template = xhttp.responseText;
            }
        };
        xhttp.open('GET', 'item.html', true);
        xhttp.send();
    }
    function isEditing (element) {
        return contains(getClasses(element), classEdit);
    }
    function isComplete (element) {
        return contains(getClasses(element), classComplete);
    }
    function getParent (element) {
        return element.parentElement;
    }
    function getAmountOfActives () {
        return getItemsCount() - getCompletedCount();
    }
    function pluralization () {
        var num = getAmountOfActives();
        if (num === 1) {
            addClass(singular, 'singular');
        }
        removeClass(singular, 'singular');
    }
    function addNewTask (content) {
        todoList.innerHTML += template;
        // Fill content somehow this is example only
        todoList.children[getItemsCount() - 1].children[0].children[2].innerHTML = content;
        addCheckFunctionality(document.getElementsByClassName('task__status')[getItemsCount() - 1]);
        addRemoveFunc(document.getElementsByClassName(classDelete)[getItemsCount() - 1]);
        console.log('added', getItemsCount() - 1);
    }
    // document.addEventListener('click', function () {
    //     addNewTask('pomidory');
    // });
    function updateCounter () {
        counter.innerHTML = getAmountOfActives();
    }
    function removeTask (element) {
        getParent(getParent(element)).remove();
    }
    function addEditedFunc (element) {
        element.addEventListener('keyup', function (e) {
            // e.target.value
        });
    }
    function addEditFunc (element) {
        element.addEventListener('dblclick', function (e) {

        });
    }
    // These adds funcionality only for last element -> find issue -> fix that
    function addCheckFunctionality (element) {
        console.warn(element);
        // Fix this
        element.addEventListener('click', function (e) {
            toggleClass(e.target.parentElement.parentElement, classComplete);
            updateCounter();
        });
    }
    function addRemoveFunc (element) {
        console.warn(element);
        // FIX this
        element.addEventListener('click', function (e) {
            removeTask(e.target);
            updateCounter()
        });
    }

    // Add events
    inputNew.addEventListener('keyup', function (e) {
        if (e.keyCode === 13 && e.target.value.trim() !== '') {
            addNewTask(e.target.value.trim());
        }
    });


    // !Functions
    // test local storage
    checkLocalStorage();
    storage = getClasses(todoList);
    saveLocalStorage();

    pluralization();
    // Test for adding new item (timeout is set to delay this function so the ajax load can get list template)
    setTimeout(function () {
        addNewTask('Buy tomatoes');
        updateCounter();
        pluralization();
    }, 1);

})(window);
