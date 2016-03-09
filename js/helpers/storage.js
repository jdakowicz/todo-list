define(function (){
    function getDataFromStorage() {
      if (window.localStorage.myItems) {
        try {
            return JSON.parse(window.localStorage.myItems);
        } catch (e) {
            console.log(e);
        }
      }
      return [];
    }
    function saveDataToStorage(data) {
        window.localStorage.myItems = JSON.stringify(data);
    }
    return {
        getData: getDataFromStorage,
        saveData: saveDataToStorage
    };
});
