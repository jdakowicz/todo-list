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
        if (window.localStorage.length > 0) {
            storage = window.localStorage;
            console.log(storage);
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
        classnameTemp = ' ' + classname.trim();
        if (hasClass(element, classname)) { return false; }
        element.className += classnameTemp;
    }
    // todo
    function removeClass (element, classname) {
        var classnameTemp = classname.trim();
        var classList = [];
        // If element doesn't have that class it's no point to going further
        if (!hasClass(element, classnameTemp)) { return false; }
        getClasses(element).forEach(function (item) {
            if (item !== classnameTemp) {
                classList.push(item);
            }
        });
        element.className = classList.join(' ');
    }
    // gets content of element without html tags
    function getContent (element) {
        return element.innerHTML.replace(/<[^>]*>/g, "");
    }
    // Check if whereItem contains whatItem
    function contains (whatItem, whereItem) {
        var i;
        for (i = 0; i < whereItem.length; i++) {
            if (whereItem[i] === whatItem) {
                return true;
            }
        }
        return false;
    }

    // Specific funcionality
    function loadTemplate () {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                template = xhttp.responseText;
                console.warn(xhttp.responseText);
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
        return getElement(classList).children.length - document.getElementsByClassName(classComplete).length;
    }
    function isSingular () {
        var num = getAmountOfActives();
        if (num === 1) {
            return true;
        }
        return false;
    }
    function addNewTask (content) {
        // todo add new item in dom from listitem.html
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
    checkLocalStorage();
    storage = getClasses(todoList);
    saveLocalStorage();
    if (isSingular()) {
        singular.className += ' singular';
    }
    updateCounter();
})(window);
