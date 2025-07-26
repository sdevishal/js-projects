const loanAmt = document.getElementById('loan-amt');
const rate = document.getElementById('rate');
const duration = document.getElementById('duration');
const btn = document.querySelector('.btn');
const error = document.querySelector('.error');
const showEMI = document.querySelector('.show-emi');
const totalAmt = document.querySelector('.total-amt');
const interest = document.querySelector('.interest');


btn.addEventListener('click', (e) => {
    e.preventDefault();
    calculateEMI();
});

function calculateEMI() {
    let p = parseFloat(loanAmt.value);
    let r = parseFloat(rate.value) / 100 / 12;
    let n = parseFloat(duration.value) * 12;

    if (!p || !r || !n) {
        error.textContent = "Please fill all the details.";
        setTimeout(() => {
            error.textContent = "";
        }, 2000);
        return;
    }

    let emi = (p * r * (1 + r) ** n) / ((1 + r) ** n - 1);
    emi = parseFloat(emi.toFixed(2));

    let totalPayment = parseFloat((emi * n).toFixed(2));
    let totalInterest = parseFloat((totalPayment - p).toFixed(2));

    showEMI.textContent = emi;
    totalAmt.textContent = totalPayment;
    interest.textContent = totalInterest;

}
