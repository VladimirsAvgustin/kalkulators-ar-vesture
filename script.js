let history = JSON.parse(localStorage.getItem('history')) || [];

function appendNumber(number) {
    document.getElementById('display').value += number;
}

function appendOperator(operator) {
    const display = document.getElementById('display');
    const currentValue = display.value;
    if (currentValue && !isNaN(currentValue[currentValue.length - 1])) {
        display.value += operator;
    }
}

function clearDisplay() {
    document.getElementById('display').value = '';
}

function calculate() {
    const display = document.getElementById('display');
    try {
        const equation = display.value;
        const result = eval(equation);
        addToHistory(equation, result);
        display.value = result;
    } catch (e) {
        display.value = 'Error';
    }
}

function addToHistory(equation, result) {
    const entry = `${equation} = ${result}`;
    history.push(entry);
    localStorage.setItem('history', JSON.stringify(history));
    renderHistory();
}

function renderHistory() {
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = '';
    history.forEach((entry, index) => {
        const li = document.createElement('li');
        const equationSpan = document.createElement('span');
        equationSpan.className = 'equation';
        equationSpan.textContent = entry;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => {
            history.splice(index, 1);
            localStorage.setItem('history', JSON.stringify(history));
            renderHistory();
        };
        li.appendChild(equationSpan);
        li.appendChild(deleteButton);
        historyList.appendChild(li);
    });
}

function clearHistory() {
    history = [];
    localStorage.setItem('history', JSON.stringify(history));
    renderHistory();
}

document.addEventListener('DOMContentLoaded', renderHistory);