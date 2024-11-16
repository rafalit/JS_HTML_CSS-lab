const addItemBtn = document.getElementById('add-item-btn');
const addItemForm = document.getElementById('add-item-form');
const cancelBtn = document.getElementById('cancel-btn');
const saveItemBtn = document.getElementById('save-item-btn');
const itemInput = document.getElementById('item-input');
const highPriorityCheckbox = document.getElementById('high-priority');
const shoppingList = document.getElementById('shopping-list');

// Show the form when "Add Item" is clicked
addItemBtn.addEventListener('click', () => {
    addItemForm.style.display = 'block';
    addItemBtn.style.display = 'none';
});

// Hide the form and reset fields when "Cancel" is clicked
cancelBtn.addEventListener('click', () => {
    addItemForm.style.display = 'none';
    addItemBtn.style.display = 'inline-block';
    itemInput.value = '';
    highPriorityCheckbox.checked = false;
});

// Add a new item to the list when "Save Item" is clicked
saveItemBtn.addEventListener('click', () => {
    const itemName = itemInput.value.trim();

    if (itemName === '') {
        alert('Please enter an item name.');
        return;
    }

    const listItem = document.createElement('li');
    listItem.textContent = itemName;

    if (highPriorityCheckbox.checked) {
        listItem.classList.add('high-priority');
    }

    listItem.addEventListener('click', () => {
        listItem.classList.toggle('completed');
    });

    shoppingList.appendChild(listItem);

    // Reset form and hide it
    itemInput.value = '';
    highPriorityCheckbox.checked = false;
    addItemForm.style.display = 'none';
    addItemBtn.style.display = 'inline-block';
});
