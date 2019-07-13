// App Controller
const App = (function (ItemCtrl, StorageCtrl, UICtrl) {
    // Load Event Listeners
    const loadEventListeners = function () {
        // Get UI Selectors
        const UISelectors = UICtrl.getSelectors();
        // Add Item Event
        document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);
        // Disable Submit on Enter
        document.addEventListener('keypress', function (e) {
            if (e.keyCode === 13 || e.which === 13) {
                e.preventDefault();
                return false;
            }
        })
        // Edit Icon Click Event
        document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);
        // Update Item Event
        document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);
        // Delete Item Event
        document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);
        // Back Button Event
        document.querySelector(UISelectors.backBtn).addEventListener('click', UICtrl.clearEditState);
        // Clear Event
        document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItems)
    }

    // Add Item Submit
    const itemAddSubmit = function (e) {
        // Get Form Input from UI Controller
        const input = UICtrl.getItemInput();
        // Check for name and calorie input
        if (input.name !== '' && input.calories !== '') {
            // Add Item
            const newItem = ItemCtrl.addItem(input.name, input.calories);
            // Add Item to UI List
            UICtrl.addListItem(newItem);
            // Store in LocalStorage
            StorageCtrl.storeItem(newItem);
            // Get Total Calories
            const totalCalories = ItemCtrl.getTotalCalories();
            // Add Total Calories to the UI
            UICtrl.showTotalCalories(totalCalories);
            // Clear Input Fields
            UICtrl.clearInput();
        }
        e.preventDefault();
    }

    // Edit State for Item
    const itemEditClick = function (e) {
        if (e.target.classList.contains('edit-item')) {
            // Get List Item ID
            const listId = e.target.parentNode.parentNode.id;
            // Get Item from ID
            const itemToEdit = ItemCtrl.getItemByID(listId);
            // Set Current Item
            ItemCtrl.setCurrentItem(itemToEdit);
            UICtrl.addItemToForm();
        }
        e.preventDefault();
    }

    // Update Item Submit
    const itemUpdateSubmit = function (e) {
        // Get Item Input
        const input = UICtrl.getItemInput();
        // Update Item
        const updatedItem = ItemCtrl.updateItem(input.name, input.calories);
        // Update UI
        UICtrl.updateListItem(updatedItem);
        // Update Local Storage
        StorageCtrl.updateItemStorage(updatedItem);
        // Get Total Calories
        const totalCalories = ItemCtrl.getTotalCalories();
        // Add Total Calories to the UI
        UICtrl.showTotalCalories(totalCalories);
        // Clear Input Fields
        UICtrl.clearInput();
        e.preventDefault();
    }

    const itemDeleteSubmit = e => {
        // Get Current Item
        const currentItem = ItemCtrl.getCurrentItem();
        // Delete from State
        ItemCtrl.deleteItem(currentItem.id);
        // Delete from UI
        UICtrl.deleteListItem(currentItem.id);
        // Get Total Calories
        const totalCalories = ItemCtrl.getTotalCalories();
        // Add Total Calories to the UI
        UICtrl.showTotalCalories(totalCalories);
        // Delete From Local Storage
        StorageCtrl.deleteItemFromStorage( currentItem.id );
        // Clear Edit Fields
        UICtrl.clearEditState();
        e.preventDefault();
    }

    const clearAllItems = function (e) {
        // Delete All Items From State
        ItemCtrl.clearAll();

        // Get Total Calories
        const totalCalories = ItemCtrl.getTotalCalories();
        // Add Total Calories to the UI
        UICtrl.showTotalCalories(totalCalories);

        // Remove Items
        UICtrl.removeItems();

        // Clear From Local Storage
        StorageCtrl.clearItemsFromStorage()
        // Hide UL
        UICtrl.hideList();

        e.preventDefault();
    }
    // Public Methods
    return {
        init: function () {
            // Set Initial State
            UICtrl.clearEditState();
            // Fetch Items from the State
            const items = ItemCtrl.getItems()
            // Check if Any Items
            if (items.length === 0) {
                UICtrl.hideList();
            } else {
                UICtrl.populateItemList(items);
                // Get Total Calories
                const totalCalories = ItemCtrl.getTotalCalories();
                // Add Total Calories to the UI
                UICtrl.showTotalCalories(totalCalories);
            }
            // Load Event Listners
            loadEventListeners();

        }
    }
})(ItemCtrl, StorageCtrl, UICtrl);

// Initialize App
App.init();