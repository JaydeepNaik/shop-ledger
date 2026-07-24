// ---------- Check Login ----------
const currentEmail = localStorage.getItem("currentUser");

if (!currentEmail) {
    window.location.href = "index.html";
}

// ---------- Get Users ----------
let users = JSON.parse(localStorage.getItem("users")) || [];

let currentUser = users.find(
    user => user.email === currentEmail
);

// ---------- Welcome ----------
document.getElementById("welcomeUser").innerHTML =
`Welcome, <b>${currentUser.name}</b>`;

// ---------- Display Expenses ----------
displayExpenses();


// ==========================================
// Add Expense
// ==========================================

function addExpense(item, price) {

    const expense = {

        item: item,

        price: price,

        date: new Date().toLocaleDateString(),

        time: new Date().toLocaleTimeString()

    };

    currentUser.expenses.push(expense);

    saveUser();

    displayExpenses();

}



// ==========================================
// Add Other Item
// ==========================================

function addOtherExpense() {

    const item = prompt("Enter Item Name");

    if (!item) return;

    const price = prompt("Enter Price");

    if (!price) return;

    if (isNaN(price)) {

        alert("Price must be number");

        return;

    }

    const expense = {

        item: item,

        price: Number(price),

        date: new Date().toLocaleDateString(),

        time: new Date().toLocaleTimeString()

    };

    currentUser.expenses.push(expense);

    saveUser();

    displayExpenses();

}



// ==========================================
// Delete Expense
// ==========================================

function deleteExpense(index){

    if(confirm("Delete this expense?")){

        currentUser.expenses.splice(index,1);

        saveUser();

        displayExpenses();

    }

}



// ==========================================
// Save User
// ==========================================

function saveUser(){

    const index = users.findIndex(

        user => user.email === currentEmail

    );

    users[index] = currentUser;

    localStorage.setItem(

        "users",

        JSON.stringify(users)

    );

}



// ==========================================
// Display Table
// ==========================================

function displayExpenses(){

    const table = document.getElementById("expenseTable");

    table.innerHTML = "";

    let total = 0;

    currentUser.expenses.forEach((expense,index)=>{

        total += Number(expense.price);

        table.innerHTML += `

        <tr>

        <td>${expense.item}</td>

        <td>₹${expense.price}</td>

        <td>${expense.time}</td>

        <td>

        <button

        class="delete"

        onclick="deleteExpense(${index})">

        Delete

        </button>

        </td>

        </tr>

        `;

    });

    document.getElementById(

        "totalAmount"

    ).innerText = total;

}



// ==========================================
// Logout
// ==========================================

document.getElementById(

"logoutBtn"

).addEventListener(

"click",

function(){

localStorage.removeItem(

"currentUser"

);

window.location.href="index.html";

});