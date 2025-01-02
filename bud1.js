// Get references to DOM elements
var bal = document.getElementById("inpsal");
var bal1 = document.getElementById("balance");
var cre = document.getElementById("inpspec");
var inc = document.getElementById("balance2");
var exp = document.getElementById("balance1");
var deb = document.getElementById("inpspe");
var listcontainer = document.getElementById("listcontainer");

// Function to load data from localStorage and update the UI
function loadData() {
    // Load balance, credited, and debited values from localStorage
    bal1.innerHTML = localStorage.getItem("balance") || 0;
    inc.innerHTML = localStorage.getItem("credited") || 0;
    exp.innerHTML = localStorage.getItem("debited") || 0;

    // Load transactions array from localStorage
    var transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    transactions.forEach(function(transaction) {
        createTransactionElement(transaction.type, transaction.text, transaction.amount);
    });
}

// Function to create and display a transaction element
// Function to create and display a transaction element
function createTransactionElement(type, text, amount) {
    var container = document.createElement("li");
    container.className = type;
    container.innerHTML = text;  // Transaction text (description)

    // Create the span for the transaction amount
    var container1 = document.createElement("span");
    container1.className = "v";
    container1.innerHTML = amount;  // Amount value

    // Create the delete button (X mark)
    var t = document.createElement("span");
    t.innerHTML = "✕";  // Unicode for "X" mark
    t.className = "delete-btn";  // Button class

    // Append the delete button to the container
    container.append(container1);  // First append the amount
    container.append(t);  // Then append the delete button

    // Append the container to the list
    listcontainer.append(container);

    // Add event listener for delete button
    t.onclick = function () {
        listcontainer.removeChild(container);  // Remove the transaction when clicked
        saveData();  // Re-save the list to localStorage after deletion
    };
}


// Function to save data to localStorage
function saveData() {
    // Save balance, credited, and debited values
    localStorage.setItem("balance", bal1.innerHTML);
    localStorage.setItem("credited", inc.innerHTML);
    localStorage.setItem("debited", exp.innerHTML);

    // Save the list of transactions
    var transactions = Array.from(listcontainer.children).map(function(li) {
        return {
            type: li.className,
            text: li.innerHTML,
            amount: li.querySelector("span").innerHTML
        };
    });
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Function to handle updating the balance
function one() {
    var c = confirm("Do you want to update your balance? Your existing balance will be erased and replaced.");
    if (c) {
        bal1.innerHTML = Number(bal.value);
        saveData();  // Save the updated balance to localStorage
    }
}

// Function to handle crediting the account
function cred() {
    var credc = confirm("Click 'OK' to make changes in Balance and credited amount, or 'Cancel' to just mark it as credited.");
    if (credc) {
        bal1.innerHTML = Number(bal1.innerHTML) + Number(cre.value);
        inc.innerHTML = Number(inc.innerHTML) + Number(cre.value);
    }

    createTransactionElement("m", inpreac.value, inpspec.value); // Create transaction
    saveData();  // Save updated data to localStorage
}

// Function to handle debiting the account
function debi() {
    var debc = confirm("Click 'OK' to make changes in Balance and debited amount, or 'Cancel' to just mark it as debited.");
    if (debc) {
        if (inpbud.value == "") {
            bal1.innerHTML = Number(bal1.innerHTML) - Number(deb.value);
            exp.innerHTML = Number(exp.innerHTML) + Number(deb.value);
        } else if (Number(exp.innerHTML) + Number(deb.value) > Number(inpbud.value)) {
            var s = confirm("You are spending more than your Spending Limit. Do you want to continue?");
            if (s) {
                bal1.innerHTML = Number(bal1.innerHTML) - Number(deb.value);
                exp.innerHTML = Number(exp.innerHTML) + Number(deb.value);
            }
        } else {
            bal1.innerHTML = Number(bal1.innerHTML) - Number(deb.value);
            exp.innerHTML = Number(exp.innerHTML) + Number(deb.value);
        }
    }

    createTransactionElement("m1", inprea.value, inpspe.value); // Create transaction
    saveData();  // Save updated data to localStorage
}

// Function to reset debited amount to zero
function res() {
    var conf = confirm("Are you sure you want to reset your debited amount to zero?");
    if (conf) {
        exp.innerHTML = 0;
        saveData();  // Save reset value to localStorage
    }
}

// Function to reset credited amount to zero
function res1() {
    var conf = confirm("Are you sure you want to reset your credited amount to zero?");
    if (conf) {
        inc.innerHTML = 0;
        saveData();  // Save reset value to localStorage
    }
}

// Initialize the application by loading data from localStorage on page load
loadData();
