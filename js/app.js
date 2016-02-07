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
    var singularClass = 'summary__text';
    var summaryNumClass = 'summary__count';

    var header = document.getElementsByTagName('header')[0];
    var footer = document.getElementsByTagName('footer')[0];
    var main = getElement('main');
    var todoList = getElement(classList);
    var inputNew = getElement(classNew);
    var counter = getElement(summaryNumClass);
    var singular = getElement(singularClass);

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
    // Get Array of elements with specific class name
    function getElement (classname) {
        return document.getElementsByClassName(classname.trim())[0];
    }
    // Get Array of class names of element
    function getClasses (element) {
        return element.className.split(' ');
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
        var classnameTemp = ' ' + classname.trim();
        if (hasClass(element, classname)) { return false; }
        element.className += classnameTemp;
    }
    // todo
    function removeClass (element, classname) {
        var classnameTemp = classname.trim();
        var classList = [];
        // If element doesn't have that class it's no point to going further
        if (hasClass(element, classnameTemp)) { return false; }
        getClasses(element).forEach(function (item) {
            if (item !== classnameTemp) {
                classList.push(item);
            }
        });
        element.className = classList.join(' ');
    }
    // Check if 'where' array contains 'whatItem'
    function contains (where, whatItem) {
        var i;
        for (i = 0; i < where.length; i++) {
            if (where[i] === whatItem) {
                return true;
            }
        }
        return false;
    }
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
            if (xhttp.readyState == 4 && xhttp.status == 200) {
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
        todoList.children[todoList.children.length - 1].children[0].children[2].innerHTML = content;

    }
    // document.addEventListener('click', function () {
    //     addNewTask('pomidory');
    // });
    function updateCounter () {
        counter.innerHTML = getAmountOfActives();
    }

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
