// Storage Controller
const StorageCtrl = (function () {
    // Public Methods
    return {
        storeItem: function (item) {
            let items;
            localStorage.getItem('items');
            if (localStorage.getItem('items') === null) {
                items = [];
                // Push New Item
                items.push(item);
                // Set LocalStorage
                localStorage.setItem('items', JSON.stringify(items));
            } else {
                items = JSON.parse(localStorage.getItem('items'));
                // Push New Item
                items.push(item);
                // Set LocalStorage Again
                localStorage.setItem('items', JSON.stringify(items));
            }
        },
        getItemsFromStorage: function () {
            let items = [];
            if (localStorage.getItem('items') !== null) {
                items = JSON.parse(localStorage.getItem('items'));
            }
            return items;
        },
        updateItemStorage: function (updatedItem) {
            let items = JSON.parse(localStorage.getItem('items'));
            // Loop through items
            items.forEach(function (item, index) {
                if (updatedItem.id === item.id) {
                    items.splice(index, 1, updatedItem);
                }
            });
            localStorage.setItem('items', JSON.stringify(items));
        },
        deleteItemFromStorage: function( id ){
            let items = JSON.parse( localStorage.getItem( 'items' ) );
            
            items.forEach( function( item, index ){
                if( item.id === id ){
                    items.splice( index, 1 );
                }
            });
            localStorage.setItem( 'items', JSON.stringify(items) );
        },
        clearItemsFromStorage: function(){
            localStorage.removeItem( 'items' );
        }
    }
})();