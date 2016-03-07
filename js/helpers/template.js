define(function () {
  var todoList = document.querySelector('.todo-list');
  function createElement(parent, tag, className) {
    var newElement  = document.createElement(tag);
    if (className !== undefined && className !== null && className !== '') {
      newElement.className = className;
    }
    parent.appendChild(newElement);
  }
  return function createTemplate(text) {
    var tempElement;
    var tempElementInner;
    // Create new list item with temporary class
    createElement(todoList, 'li', 'new-temporary-class');
    // cache new element
    tempElement = document.querySelector('.new-temporary-class');
    // Add div.view to new element
    createElement(tempElement, 'div', 'view');
    // Add input to edit
    createElement(tempElement, 'input', 'edit');
    // Set edit value to text
    tempElement.querySelector('.edit').value = text;
    // Set input value to text value
    tempElement.querySelector('input').value = text;
    // Cache inner div
    tempElementInner = tempElement.querySelector('.view');
    // Add input checkbox
    createElement(tempElementInner, 'input', 'toggle');
    // Set input type to checkbox
    tempElementInner.querySelector('.toggle').type = 'checkbox';
    // Create Label
    createElement(tempElementInner, 'label');
    // Set text of label
    tempElementInner.querySelector('label').innerHTML = text;
    // Create button
    createElement(tempElementInner, 'button', 'destroy');
  }
});
