let current = '';
let operator = '';
let operand = '';

function press(val) {
    const display = document.getElementById('display');
    if ('+-*/'.includes(val)) {
        if (current !== '' && operator === '') {
            operand = current;
            operator = val;
            current = '';
            display.value = operand + ' ' + operator + ' ';
        }
    } else {
        current += val;
        display.value = (operand ? operand + ' ' + operator + ' ' : '') + current;
    }
}

function clearDisplay() {
    current = '';
    operator = '';
    operand = '';
    document.getElementById('display').value = '';
}

async function calculate() {
    if (operand !== '' && operator !== '' && current !== '') {
        const a = parseFloat(operand);
        const b = parseFloat(current);
        let op = operator;
        // Debug: log the values being sent
        console.log('Sending to backend:', { a, b, op });
        const response = await fetch('/api/calc', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ a, b, op })
        });
        const data = await response.json();
        console.log('Backend response:', data);
        if (data.result !== undefined) {
            document.getElementById('display').value = data.result;
            current = data.result.toString();
            operator = '';
            operand = '';
        } else {
            document.getElementById('display').value = data.error || 'Error';
            current = '';
            operator = '';
            operand = '';
        }
    }
}
