moment.locale("id");
let currentOperand = "";
let previousOperand = "";
let operator = undefined;
let displayOperator = document.getElementById("op");

setInterval(function () {
  document.getElementById("time").innerText = moment().format("H : mm");
}, 1000);

/* fungsi ini untuk memformat angka dengan menambahkan 
titik setiap 3 digit untuk memudahkan pembacaan angka */
function formatNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
// atur angka didalam fungsi
function number(number) {
  if (number === "." && currentOperand.includes(".")) return;
  currentOperand = currentOperand.toString() + number.toString();
  updateDisplay();
}

// fungsi ini untuk menghapus jumlah angka satu per satu
function backspace() {
  currentOperand = currentOperand.toString().slice(0, -1);
  if (currentOperand === "") currentOperand = "";
  displayOperator.innerText = "";
  updateDisplay();
}

// fungsi ini untuk menampilkan angka yang dibuat dan menampilkan jumlah angka yang dhitung
function updateDisplay() {
  document.getElementById("show").innerText = formatNumber(
    currentOperand || "0"
  );
}

// fungsi ini untuk menghapus seluruh angka pada display
function clearAll() {
  currentOperand = "";
  previousOperand = "";
  operator = "";
  displayOperator.innerText = "";
  updateDisplay();
}

// fungsi ini untuk memberikan operator berdasarkan operato yang ingin ditambahkan
function operation(operand) {
  if (currentOperand === "" && previousOperand !== "") {
    operator = operand;
    displayOperator.innerText = operator;
    return;
  }
  if (currentOperand === "") return;
  if (previousOperand !== "") {
    calculate();
  }
  operator = operand;
  previousOperand = currentOperand;
  currentOperand = "";
  displayOperator.innerText = operand;
}

// fungsi ini untuk melakukan perhitungan menggunakan operator yang dipilih
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
