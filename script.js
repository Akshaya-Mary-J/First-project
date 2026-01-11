const balance = document.getElementById('balance');
const income = document.getElementById('income');
const expense = document.getElementById('expense');
const list = document.getElementById('list');
const descInput = document.getElementById('desc');
const amountInput = document.getElementById('amount');
const addBtn = document.getElementById('add');

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

function updateDOM() {
  list.innerHTML = '';
  let total = 0, inc = 0, exp = 0;
  transactions.forEach((tr, i) => {
    const sign = tr.amount > 0 ? '+' : '-';
    const li = document.createElement('li');
    li.classList.add(tr.amount > 0 ? 'income' : 'expense');
    li.innerHTML = `
      ${tr.desc} <span>${sign}$${Math.abs(tr.amount)}</span>
      <button onclick="removeTransaction(${i})">x</button>
    `;
    list.appendChild(li);

    total += tr.amount;
    if (tr.amount > 0) inc += tr.amount;
    else exp += Math.abs(tr.amount);
  });

  balance.textContent = `$${total}`;
  income.textContent = `$${inc}`;
  expense.textContent = `$${exp}`;
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

function addTransaction() {
  const desc = descInput.value.trim();
  const amount = +amountInput.value;

  if (!desc || amount === 0) return alert('Enter description and valid amount');

  transactions.push({ desc, amount });
  descInput.value = '';
  amountInput.value = '';
  updateDOM();
}

function removeTransaction(index) {
  transactions.splice(index, 1);
  updateDOM();
}

addBtn.addEventListener('click', addTransaction);
updateDOM();