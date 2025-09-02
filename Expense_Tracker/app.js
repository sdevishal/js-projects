const tabBtns = document.querySelectorAll('.tab-btn');
const contentPanels = document.querySelectorAll('.content-panel');
const displayBalance = document.querySelector('#display-balance');
const displayIncome = document.querySelector('#display-income');
const displayExpense = document.querySelector('#display-expense');
const expenseSource = document.querySelector('#expense-source');
const incomeSource = document.querySelector('#income-source');
const expenseAmt = document.querySelector('#expense-amt');
const incomeAmt = document.querySelector('#income-amt');
const txnsHistory = document.querySelector('.txns-history');
const errorMsg = document.querySelector('.error-msg');
const submitBtn = document.querySelector('.submit-btn');

// load data on refresh
const userData = JSON.parse(localStorage.getItem('userData')) ||
    { balance: 0, income: 0, expense: 0, transactions: [] };
loadData();

submitBtn.addEventListener('click', handleTransaction);

function loadData() {
    //calling tab componenet
    tabComponent();

    // loading data from localstorage 
    displayBalance.textContent = `$${userData.balance.toFixed(2)}`;
    displayIncome.textContent = `+$${userData.income.toFixed(2)}`;
    displayExpense.textContent = `-$${userData.expense.toFixed(2)}`;
    renderTransaction();
}

function tabComponent() {
    tabBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // prevent forms from relaoding
            e.preventDefault();

            // remove active class
            tabBtns.forEach(btn => btn.classList.remove('active'));
            contentPanels.forEach(panel => panel.classList.remove('active'));

            // add active class to button
            btn.classList.add('active');

            // add active class to panel
            const targetId = btn.dataset.target;
            const targetPanel = document.getElementById(targetId);

            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
}

function handleTransaction(e) {
    // prevent forms from relaoding
    e.preventDefault();
    let transaction;
    // adding income
    if (incomeAmt.value && incomeAmt.value > 0) {
        transaction = {
            id: Date.now(),
            name: incomeSource.value || "Unnamed Income",
            // amount: `+$${Number(incomeAmt.value)}`
            amount: Number(incomeAmt.value)  // positive number
        };

        userData.balance += Number(incomeAmt.value);
        userData.income += Number(incomeAmt.value);
        displayBalance.textContent = `$${userData.balance.toFixed(2)}`;
        displayIncome.textContent = `+$${userData.income.toFixed(2)}`;
    }

    //adding expense
    if (expenseAmt.value && expenseAmt.value > 0) {
        if (Number(expenseAmt.value) > userData.balance) {
            expenseAmt.value = ''; // clear input
            errorMsg.textContent = 'Not enough balance!';
            setTimeout(() => {
                errorMsg.textContent = '';
            }, 2000);
            return;
        }

        transaction = {
            id: Date.now(),
            name: expenseSource.value || "Unnamed Expense",
            // amount: `-$${Number(expenseAmt.value)}`
            amount: -Number(expenseAmt.value) // negative number
        };

        userData.balance -= Number(expenseAmt.value);
        userData.expense += Number(expenseAmt.value);
        displayBalance.textContent = `$${userData.balance.toFixed(2)}`;
        displayExpense.textContent = `-$${userData.expense.toFixed(2)}`;
    }

    if (!transaction) return;
    userData.transactions.push(transaction);
    localStorage.setItem('userData', JSON.stringify(userData));
    renderTransaction(); // render transaction on  submit
    expenseAmt.value = ''; // clear input
    incomeAmt.value = ''; // clear input
    expenseSource.value = ''; // clear input
}

function renderTransaction() {
    // clear existing transaction history
    txnsHistory.innerHTML = '';

    //  creating transaction
    userData.transactions.forEach(transaction => {
        const li = document.createElement('li');
        // const isIncome = transaction.amount.startsWith('+');
        const isIncome = transaction.amount > 0;

        // Set class based on transaction type
        li.classList.add(`${isIncome ? 'plus' : 'minus'}`);

        const textSpan = document.createElement('span');
        textSpan.textContent = transaction.name;

        const amtSpan = document.createElement('span');
        // amtSpan.textContent = transaction.amount;
        amtSpan.textContent = `${isIncome ? '+' : '-'}$${Math.abs(transaction.amount)}`;

        li.appendChild(textSpan);
        li.appendChild(amtSpan);
        txnsHistory.appendChild(li);
    });
}


