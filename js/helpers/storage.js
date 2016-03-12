define(function () {
    function getDataFromStorage () {
        var myItems = [];
        // Check if there is something in local storage with name myItems
        if (window.localStorage.myItems) {
            // If there is something with the name we are using try to parse
            // If it's not parseable do nothing
            try {
                myItems = JSON.parse(window.localStorage.myItems);
            } catch (e) {
                console.log(e);
            }
        }
        // Return
        return myItems;
    }
    function saveDataToStorage (data) {
        // Stringify the object and save it in localStorage
        window.localStorage.myItems = JSON.stringify(data);
    }
    return {
        getData: getDataFromStorage,
        saveData: saveDataToStorage
    };
});
