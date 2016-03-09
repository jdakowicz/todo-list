define(function () {
    // TODO ->
    return {
        get: function (selector) {
            return document.querySelector(selector);
        },
        getAll: function (selector) {
            return document.querySelectorAll(selector);
        }
    }
});
