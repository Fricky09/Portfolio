
const billInput = document.getElementById('bill-amount');
const peopleInput = document.getElementById('people-count');
const customTipInput = document.getElementById('custom-tip');
const tipAmountDisplay = document.getElementById('tip-amount');
const totalAmountDisplay = document.getElementById('total-amount');
const perPersonDisplay = document.getElementById('per-person');
const tipButtons = document.querySelectorAll('.tip-btn');

let selectedTip = 25;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    calculateBill();

    // Tip button selection
    tipButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            tipButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedTip = parseFloat(btn.dataset.tip);
            customTipInput.value = '';
            calculateBill();
        });
    });

    // Custom tip input
    customTipInput.addEventListener('input', () => {
        if (customTipInput.value) {
            tipButtons.forEach(b => b.classList.remove('active'));
            selectedTip = parseFloat(customTipInput.value) || 0;
            CalculateBill();
        }
    });

    // Real-time calculation
    billInput.addEventListener('input', calculateBill);
    peopleInput.addEventListener('input', calculateBill);
});

function calculateBill() {
    const bill = parseFloat(billInput.value) || 0;
    const people = parseInt(peopleInput.value) || 1;
    const tipPercent = selectedTip;

    if (bill > 0) {
        const tipAmount = bill * (tipPercent / 100);
        const total = bill + tipAmount;
        const perPerson = total / people;

        tipAmountDisplay.textContent = '$' + tipAmount.toFixed(2);
        totalAmountDisplay.textContent = '$' + total.toFixed(2);
        perPersonDisplay.textContent = '$' + perPerson.toFixed(2);
    } else {
        tipAmountDisplay.textContent = '$0.00';
        totalAmountDisplay.textContent = '$0.00';
        perPersonDisplay.textContent = '$0.00';
    }
}

function resetCalculator() {
    billInput.value = '';
    peopleInput.value = 2;
    customTipInput.value = '';
    selectedTip = 25;
    tipButtons.forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector('[data-tip="25"]').classList.add('active');
    calculateBill();
}

