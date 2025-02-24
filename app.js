const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let currentInput = "";
let operator = "";
let previousInput = "";

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (value === "=") {
      // Perform calculation
      try {
        currentInput = eval(previousInput + operator + currentInput);
        display.value = currentInput;
        operator = "";
        previousInput = "";
      } catch (error) {
        display.value = "Error";
      }
    } else if (value === "C") {
      // Clear display
      currentInput = "";
      previousInput = "";
      operator = "";
      display.value = "";
    } else if (["+", "-", "*", "/"].includes(value)) {
      // Set operator
      if (previousInput && currentInput) {
        currentInput = eval(previousInput + operator + currentInput);
        display.value = currentInput;
      }
      operator = value;
      previousInput = currentInput;
      currentInput = "";
    } else {
      // Add number to current input
      currentInput += value;
      display.value = currentInput;
    }
  });
});