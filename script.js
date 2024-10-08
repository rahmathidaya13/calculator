moment.locale("id");
let currentOperand = "";
let previousOperand = "";
let operator = undefined;
let displayOperator = document.getElementById("op");

setInterval(function () {
  document.getElementById("time").innerText = moment().format("H : mm");
}, 1000);


function formatNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function number(number) {
  if (number === "." && currentOperand.includes(".")) return;
  currentOperand = currentOperand.toString() + number.toString();
  updateDisplay();
}

function backspace() {
  currentOperand = currentOperand.toString().slice(0, -1);
  if (currentOperand === "") currentOperand = "";
  displayOperator.innerText = "";
  updateDisplay();
}

function updateDisplay() {
  document.getElementById("show").innerText = formatNumber(
    currentOperand || "0"
  );
}

function clearAll() {
  currentOperand = "";
  previousOperand = "";
  operator = "";
  displayOperator.innerText = "";
  updateDisplay();
}

function operation(operand) {
  if (currentOperand === "" && previousOperand !== "") {
    operator = operand;
    displayOperator.innerText = operator;
    return;
  }
  if (currentOperand === "") return;
  if (previousOperand !== "")calculate();
  operator = operand;
  previousOperand = currentOperand;
  currentOperand = "";
  displayOperator.innerText = operand;
}

function calculate() {
  let result;
  let prev = parseFloat(previousOperand);
  let current = parseFloat(currentOperand);
  if (isNaN(prev) && isNaN(current)) return;
  switch (operator) {
    case "+":
      result = prev + current;
      break;
    case "-":
      result = prev - current;
      break;
    case "*":
      result = prev * current;
      break;
    case "/":
      result = prev / current;
      break;
    default:
      return;
  }
  currentOperand = result;
  operator = undefined;
  previousOperand = "";
  updateDisplay();
}
