// Globals for shorter queries
function _e (sel) {
    return document.querySelector(sel);
}
function __e (sel) {
    return document.querySelectorAll(sel);
}
function getArray (obj) {
    var arr = [],
        i = 0;

    if (obj && obj.length) {
        for (i; i < obj.length; i++) {
            arr.push(obj[i]);
        }
    }
    return arr;
}

requirejs(['app']);
