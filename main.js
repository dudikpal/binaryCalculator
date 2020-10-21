
const calculator = {
  displayValue: '0',
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null
};


function inputDigit(digit) {   
    let {displayValue, waitingForSecondOperand} = calculator;
    
    // Overwrite `displayValue` if the current value is '0' otherwise append to it
    if (waitingForSecondOperand === true) {
      calculator.displayValue = digit.toString(2);
      calculator.waitingForSecondOperand = false;
    } else {
      calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;    
    }      
}


function handleOperator(nextOperator) {
  // Destructure the properties on the calculator object
  const {firstOperand, displayValue, operator} = calculator;
  // toString(2) converts the value contents of `displayValue`
  // to a binary number
  const inputValue = displayValue.toString(2);  

  if (operator && calculator.waitingForSecondOperand) {
    calculator.operator = nextOperator;    
    return;
  }

  // verify that `firstOperand` is null and that the `inputValue`
  // is not a `NaN` value
  if (firstOperand === null && !isNaN(inputValue)) {
    // Update the firstOperand property
    calculator.firstOperand = inputValue.toString(2);
  } else if (operator) {
    // Math.trunc drop the remainder, if exist
    const result = Math.trunc(calculate(firstOperand, inputValue, operator));    
    calculator.displayValue = result.toString(2);
    calculator.firstOperand = result.toString(2);    
  }

  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;  
}

function calculate(firstOperand, secondOperand, operator) {
  if (operator === '+') {
    return parseInt(firstOperand, 2) + parseInt(secondOperand, 2);
  } else if (operator === '-') {
    return parseInt(firstOperand, 2) - parseInt(secondOperand, 2);
  } else if (operator === '*') {
    return parseInt(firstOperand, 2) * parseInt(secondOperand, 2);
  } else  if (operator === '/') {
    return parseInt(firstOperand, 2) / parseInt(secondOperand, 2);
  }

  return secondOperand;
}

function resetCalculator() {
  calculator.displayValue = '0';
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;  
}

function updateDisplay() {
  const display = document.querySelector(".calculator-screen");
  display.value = calculator.displayValue;
}

updateDisplay();

const keys = document.querySelector(".calculator-keys");
keys.addEventListener('click', (event) => {
  //Acces the clicked element
  // target = event.target
  const {target} = event;
  const {value} = target;

  if (!target.matches('button')) {
    return;
  }
  
  switch (value) {
    case '+':
    case '-':
    case '*':
    case '/':
    case '=':
      handleOperator(value);
      break;    
    case 'all-clear':
      resetCalculator();
      break;
    default:
      // check if the key is an integer
      if (Number.isInteger(parseInt(value))) {
        inputDigit(value);
      }    
  }
  
  updateDisplay();
  
});
