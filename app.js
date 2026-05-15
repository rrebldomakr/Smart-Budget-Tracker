let expenses = JSON.parse(localStorage.getItem("budget_data")) || [];

function addExpense() {
    const desc = document.getElementById("exp-desc").value;
    const amount = parseFloat(document.getElementById("exp-amount").value);
    const category = document.getElementById("exp-category").value;

    if (!desc || !amount) return alert("Fill in the fields!");

    expenses.push({ desc, amount, category });
    localStorage.setItem("budget_data", JSON.stringify(expenses));
    
    document.getElementById("exp-desc").value = "";
    document.getElementById("exp-amount").value = "";
    updateUI();
}

function updateUI() {
    const list = document.getElementById("expense-list");
    const totalEl = document.getElementById("total-spent");
    const remainEl = document.getElementById("remaining-budget");
    const limit = parseFloat(document.getElementById("budget-limit").value);

    list.innerHTML = "";
    let total = 0;
    let funTotal = 0;

    expenses.forEach((ex, index) => {
        total += ex.amount;
        if (ex.category === "Fun") funTotal += ex.amount;

        const li = document.createElement("li");
        li.innerHTML = `<span>${ex.desc} (${ex.category})</span> <b>$${ex.amount}</b>`;
        list.appendChild(li);
    });

    // CALCULATE FUN PERCENTAGE
    const funPercentage = (funTotal / total) * 100;
    
    // THE TWIST: CHANGE COLORS BASED ON DATA
    const statBox = document.querySelector(".stat-item");
    statBox.classList.remove("warning-mode", "danger-mode");

    if (funPercentage > 50) {
        statBox.classList.add("danger-mode");
    } else if (funPercentage > 30) {
        statBox.classList.add("warning-mode");
    }

    totalEl.innerText = `$${total}`;
    remainEl.innerText = `$${limit - total}`;
}

updateUI();