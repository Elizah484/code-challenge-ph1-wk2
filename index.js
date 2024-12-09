// Array to store items
let shoppingList = [];

// Select DOM elements
const itemInput = document.getElementById('item-input');
const addButton = document.getElementById('add-button');
const shoppingListContainer = document.getElementById('shopping-list');
const clearButton = document.getElementById('clear-button');

// Add item function
function addItem() {
  const item = itemInput.value.trim();

  if (item !== '') {
    // Add item to array
    shoppingList.push({ name: item, purchased: false });

    // Update the DOM
    renderList();

    // Clear the input field
    itemInput.value = '';
    saveToLocalStorage();
  } else {
    alert('Please enter an item.');
  }
}

// Render the shopping list
function renderList() {
  shoppingListContainer.innerHTML = '';

  shoppingList.forEach((item, index) => {
    const li = document.createElement('li');
    li.className = item.purchased ? 'purchased' : '';

    li.textContent = item.name;

    // Toggle purchase status on click
    li.addEventListener('click', () => {
      shoppingList[index].purchased = !shoppingList[index].purchased;
      renderList();
      saveToLocalStorage();
    });

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';
    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent parent click event
      shoppingList.splice(index, 1);
      renderList();
      saveToLocalStorage();
    });

    li.appendChild(deleteBtn);
    shoppingListContainer.appendChild(li);
  });
}

// Clear the shopping list
function clearList() {
  shoppingList = [];
  renderList();
  saveToLocalStorage();
}

// Save list to localStorage
function saveToLocalStorage() {
  localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
}

// Load list from localStorage
function loadFromLocalStorage() {
  const storedList = localStorage.getItem('shoppingList');
  if (storedList) {
    shoppingList = JSON.parse(storedList);
    renderList();
  }
}

// Event listeners
addButton.addEventListener('click', addItem);
clearButton.addEventListener('click', clearList);
document.addEventListener('DOMContentLoaded', loadFromLocalStorage);