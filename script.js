const keys = document.querySelector(".keys");

class Calculator {
    addition = (a, b) => a + b;
    subtraction = (a, b) => a - b;
    multiplication = (a, b) => a * b;
    division = (a, b) => a / b;
}

class Display {

    constructor() {
        this.display_result = document.querySelector("#result");
        this.display_value = document.querySelector("#value");

        this.value = "";
        this.result = "";
    }

    updateDisplayValue(value) {
        this.display_value.value = value;
    }

    updateDisplayResult(value) {
        this.display_result.value = value;
    }

    clear() {
        this.value = "";
        this.result = "";
        this.updateDisplayResult("");
        this.updateDisplayValue("");
    }

    delete() {
        this.value = this.value.slice(0, -1);
        this.updateDisplayValue(this.value);
    }

    append(value) {
        this.value += value;
        this.updateDisplayValue(this.value);
    }

    appendDecimal() {
        if (this.value.includes(".")) {
            return;
        }
        else if (this.value.length === 0) {
            this.value = "0.";
        }
        else {
            this.value += ".";
        }

        this.updateDisplayValue(this.value);

    }
}

const calculator = new Calculator();
const display = new Display();
let operator = "";

keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
        let key = e.target;
        let action = key.dataset.value;
        let content = key.textContent;

        if (!action) {
            display.append(content);
        } else if (action === '+' || action === '-' || action === 'x' || action === '/') {
            if (display.result === "" && display.value === "") return;

            if (display.value !== "" && display.result === "") {
                display.result = display.value;
                display.value = "";
                display.updateDisplayValue("");
            }

            display.updateDisplayResult(display.result + " " + action);
            operator = action;
        } else if (action === 'decimal') {
            display.appendDecimal();
        } else if (action === 'calculate') {
            if(display.value !== "" && display.result !== "") {
                calculate(display.result, display.value);
            }
        } else if (action === 'clear') {
            display.clear();
            operator = "";
        } else if (action === "delete") {
            display.delete();
        }
    }
});

function calculate(num1, num2) {
    if (operator === "") return;
    
    let result = 0;

    switch (operator) {
        case "+":
            result = calculator.addition(parseFloat(num1), parseFloat(num2));
            break;
        case "-":
            result = calculator.subtraction(parseFloat(num1), parseFloat(num2));
            break;
        case "x":
            result = calculator.multiplication(parseFloat(num1), parseFloat(num2));
            break;
        case "/":
            result = calculator.division(parseFloat(num1), parseFloat(num2));
            break;
    }

    display.updateDisplayResult(result);
    display.result = result;
    display.value = "";
    display.updateDisplayValue("");
    operator = "";
}