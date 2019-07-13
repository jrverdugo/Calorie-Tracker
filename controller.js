// Item Controller
const ItemCtrl = (function () {
    // Item Constructor
    const Item = function (id, name, calories) {
        this.id = id;
        this.name = name;
        this.calories = calories;
    }

    // State
    const data = {
        items: StorageCtrl.getItemsFromStorage(),
        currentItem: null,
        totalCalories: 0
    }

    // Public Methods
    return {
        getItems: function () {
            return data.items;
        },
        addItem: function (name, calories) {
            // Create ID
            let ID = 0;
            if( data.items.length !== 0 )
                ID = data.items[data.items.length - 1].id + 1;

            // Calories to Number
            calories = parseInt(calories);

            // Create New Item
            const newItem = new Item(ID, name, calories);

            // Add New Item to Items Array
            data.items.push(newItem);
            return newItem;
        },
        logData: function () {
            return data;
        },
        getTotalCalories: function () {
            let total = 0;
            // Loop through Items and Their Calories
            data.items.forEach(function (item) {
                total += item.calories;
            });
            // Set Total Calories to the Total
            data.totalCalories = total;
            return total;
        },
        getItemByID: function (id) {
            let found = null;
            // Loop through items
            data.items.forEach(function (item) {
                if (item.id === parseInt(id)) {
                    found = item;
                }
            })
            return found;
        },
        setCurrentItem: function (item) {
            data.currentItem = item;
        },
        getCurrentItem: function () {
            return data.currentItem;
        },
        updateItem: function (name, calories) {
            // Calories to Number
            calories = parseInt(calories);

            let found = null;
            data.items.forEach(function (item) {
                if (item.id === data.currentItem.id) {
                    item.name = name;
                    item.calories = calories;
                    found = item;
                }
            });
            return found;
        },
        deleteItem: id => {
            // Get IDs
            ids = data.items.map(function (item) {
                return item.id;
            });
            // Get Index
            const index = ids.indexOf(id);
            // Remove Item
            data.items.splice(index, 1);
        },
        clearAll: function () {
            data.items = [];
        }
    }
})();