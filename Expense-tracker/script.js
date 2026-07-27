// 1. Select DOM Elements
const incomeEl = document.querySelector('.income-num');
const expenseEl = document.querySelector('.expense-num');
const balanceEl = document.querySelector('.balance-num');

const budgetInput = document.getElementById('budget');
const exTitleInput = document.getElementById('ex-tittle');
const amountInput = document.getElementById('amount');

const budgetForm = document.querySelector('.budget-form form');
const expenseForm = document.querySelector('.expense-form form');
const listContainer = document.querySelector('.list-container'); // Wraps expense list items

// 2. Retrieve Data from LocalStorage (or set default values)
let totalBudget = Number(localStorage.getItem('totalBudget')) || 0;
let expenseArr = JSON.parse(localStorage.getItem('expensesData')) || [];

// Save to LocalStorage Helper
function updateLocalStorage() {
    localStorage.setItem('totalBudget', totalBudget);
    localStorage.setItem('expensesData', JSON.stringify(expenseArr));
}

// 3. Main Calculation & UI Update Function
function updateUI() {
    // Calculate total expense sum
    const totalExpense = expenseArr.reduce((acc, curr) => acc + curr.amount, 0);
    const currentBalance = totalBudget - totalExpense;

    // Display numbers on screen
    incomeEl.innerHTML = totalBudget.toFixed(2);
    expenseEl.innerHTML = totalExpense.toFixed(2);
    balanceEl.innerHTML = currentBalance.toFixed(2);

    // Color feedback for balance
    if (currentBalance < 0) {
        balanceEl.style.color = '#ff4757';
    } else {
        balanceEl.style.color = '#6c5ce7';
    }

    displayList();
    updateLocalStorage();
}

// 4. Render Expense List
function displayList() {
    if (!listContainer) return;
    listContainer.innerHTML = '';

    expenseArr.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'list';

        div.innerHTML = `
            <ul>${item.title}</ul>
            <p class="price">$${item.amount.toFixed(2)}</p>
            <button class="edit" onclick="editExpense(${index})">
                <img src="images/edit.svg" width="22" alt="edit">
            </button>
            <button class="delete" onclick="deleteExpense(${index})">
                <img src="images/delete.svg" width="22" alt="delete">
            </button>
        `;

        listContainer.appendChild(div);
    });
}

// 5. Budget Form Submit
budgetForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const val = Number(budgetInput.value);

    if (val <= 0 || isNaN(val)) {
        alert("Please enter a valid budget!");
        return;
    }

    totalBudget = val;
    budgetInput.value = '';
    updateUI();
});

// 6. Expense Form Submit
expenseForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const title = exTitleInput.value.trim();
    const amount = Number(amountInput.value);

    if (title === '' || amount <= 0 || isNaN(amount)) {
        alert("Please enter valid expense details!");
        return;
    }

    // Push expense object into array
    expenseArr.push({ title: title, amount: amount });

    exTitleInput.value = '';
    amountInput.value = '';
    updateUI();
});

// 7. Delete Expense Action
function deleteExpense(index) {
    expenseArr.splice(index, 1); // Array se remove
    updateUI();
}

// 8. Edit Expense Action
function editExpense(index) {
    const item = expenseArr[index];
    const newTitle = prompt("Edit expense name:", item.title);
    const newAmount = prompt("Edit expense amount:", item.amount);

    if (newTitle && newAmount && !isNaN(Number(newAmount))) {
        expenseArr[index] = {
            title: newTitle.trim(),
            amount: Number(newAmount)
        };
        updateUI();
    }
}

// Initial Load when Page Starts
updateUI();