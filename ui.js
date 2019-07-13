// UI Controller
const UICtrl = (function () {
    const UISelectors = {
        itemList: '#item-list',
        addBtn: '.add-btn',
        updateBtn: '.update-btn',
        deleteBtn: '.delete-btn',
        backBtn: '.back-btn',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories',
        totalCalories: '.total-calories',
        listItems: "#item-list li",
        clearBtn: '.clear-btn'
    }
    return {
        populateItemList: function (items) {
            let html = '';
            items.forEach(function (item) {
                html += `
                    <li id="${item.id}" class="collection-item">
                        <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                        <a href="#" class = "secondary-content">
                            <i class = "edit-item fa fa-pencil"></i>
                        </a>
                    </li>`;
            });
            // Insert List Items
            document.querySelector(UISelectors.itemList).innerHTML = html;
        },
        getItemInput: function () {
            return {
                name: document.querySelector(UISelectors.itemNameInput).value,
                calories: document.querySelector(UISelectors.itemCaloriesInput).value
            }
        },
        addListItem: function (item) {
            // Show the List
            document.querySelector(UISelectors.itemList).style.display = "block";
            // Create li Element
            const li = document.createElement('li');
            // Add Class
            li.className = "collection-item";
            // Add ID
            li.id = `${item.id}`;
            // Add HTML
            li.innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
            <a href="#" class = "secondary-content">
                <i class = "edit-item fa fa-pencil"></i>
            </a>
            `;
            // Insert Item
            document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li)
        },
        clearInput: function () {
            document.querySelector(UISelectors.itemCaloriesInput).value = '';
            document.querySelector(UISelectors.itemNameInput).value = '';
        },
        hideList: function () {
            document.querySelector(UISelectors.itemList).style.display = 'none';
        },
        getSelectors: function () {
            return UISelectors;
        },
        showTotalCalories: function (totalCalories) {
            document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
        },
        clearEditState: function () {
            UICtrl.clearInput();
            document.querySelector(UISelectors.deleteBtn).style.display = 'none';
            document.querySelector(UISelectors.updateBtn).style.display = 'none';
            document.querySelector(UISelectors.backBtn).style.display = 'none';
            document.querySelector(UISelectors.addBtn).style.display = 'inline';
        },
        showEditState: function () {
            document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
            document.querySelector(UISelectors.updateBtn).style.display = 'inline';
            document.querySelector(UISelectors.backBtn).style.display = 'inline';
            document.querySelector(UISelectors.addBtn).style.display = 'none';
        },
        addItemToForm: function () {
            document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;
            document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
            UICtrl.showEditState();
        },
        updateListItem: function (item) {
            document.getElementById(`${item.id}`).innerHTML = `
            <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
             <a href="#" class = "secondary-content">
               <i class = "edit-item fa fa-pencil"></i>
             </a>
                    `
        },
        deleteListItem: id => {
            document.getElementById(id).remove();
        },
        removeItems: function () {
            let listItems = document.querySelectorAll(UISelectors.listItems);

            // Turn Node List into Array
            listItems = Array.from(listItems);
            listItems.forEach(function (item) {
                item.remove();
            })
        }
    }
})();