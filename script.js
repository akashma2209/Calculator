const display = document.getElementById('result');

const operationElement = document.getElementById('operation');

const numberButtons = document.querySelectorAll('.number');

const operatorButtons = document.querySelectorAll('.operator');

const clearButton = document.getElementById('clear');

const calculateButton = document.getElementById('calculate');

const backspaceButton = document.getElementById('backspace');

let currentInput = '0';
let operator = '';
let previousInput = '';

// Function to update the display with the current input
function updateDisplay() {
  display.value = parseFloat(currentInput).toLocaleString('en', {
    maximumFractionDigits: 10,
  });
}

// Function to update the operation screen with the current operation
function updateOperationScreen() {
  let operationText = '';
  if (previousInput !== '' && operator !== '') {
    operationText = `${previousInput} ${operator}`;
  }
  operationElement.textContent = operationText;
}

// Event listeners for number 
numberButtons.forEach((button) => {
  button.addEventListener('click', () => {
    if (currentInput === '0') {
      currentInput = button.value;
    } else {
      currentInput += button.value;
    }
    updateDisplay();
  });
});

// Event listeners for operator 
operatorButtons.forEach((button) => {
  button.addEventListener('click', () => {
    if (operator !== '') {
      calculate();
    }
    operator = button.value;
    previousInput = currentInput;
    currentInput = '';
    updateOperationScreen();
  });
});

// Event listener for calculate 
calculateButton.addEventListener('click', () => {
  calculate();
});

// Event listener for clear 
clearButton.addEventListener('click', () => {
  clear();
  updateOperationScreen();
});

// Event listener for backspace 
backspaceButton.addEventListener('click', () => {
  currentInput = currentInput.slice(0, -1);
  if (currentInput === '') {
    currentInput = '0';
  }
  updateDisplay();
});

//Division by zero error
function handleDivisionByZero() {
  clear();
  operationElement.textContent = ''; 
  display.value = 'Error: Division by zero';
}

// Square root operation
function sqrt() {
  const num = parseFloat(currentInput);
  if (num >= 0) {
    currentInput = Math.sqrt(num).toString();
    updateDisplay();
  } else {
    display.value = 'Error: Invalid input';
    setTimeout(() => {
      clear();
      updateOperationScreen();
    }, 2000); 
  }
}

// Performing calculation
function calculate() {
  const num1 = parseFloat(previousInput);
  const num2 = parseFloat(currentInput);

  switch (operator) {
    case '+':
      currentInput = (num1 + num2).toString();
      break;
    case '-':
      currentInput = (num1 - num2).toString();
      break;
    case '*':
      currentInput = (num1 * num2).toString();
      break;
    case '/':
      if (num2 === 0) {
        handleDivisionByZero();
        return;
      }
      currentInput = (num1 / num2).toString();
      break;
    case '^':
      currentInput = Math.pow(num1, num2).toString();
      break;
    case 'sqrt':
      sqrt();
      return;
    default:
      break;
  }

  operator = '';
  previousInput = '';
  updateDisplay();
  updateOperationScreen();
}

// Clearand reset variables
function clear() {
  currentInput = '0';
  operator = '';
  previousInput = '';
  updateDisplay();
}

// Initialize the display
updateDisplay();
