//Obtenemos redeencia a los botones html (numeros, operadores e igual)
const btn_calculator = document.querySelector("#calculate");
const btn_numbers = document.querySelectorAll(".number");
const btn_operators = document.querySelectorAll(".operator");


class Calculator {
    addition = (a, b) => a + b;
    subtraction = (a, b) => a - b;
    multiplication = (a, b) => a * b;
    division = (a, b) => a / b;

    calculate(operator, a, b) {
        switch (operator) {
            case "+":

                break;

            default:
                break;
        }
    }
}

class Display {

    constructor() {
        this.display_result = document.querySelector("#result");
        this.display_value = document.querySelector("#value");
        this.btn_clear = document.querySelector("#clear");
        this.btn_delete = document.querySelector("#delete");
        this.btn_dot = document.querySelector("#dot");

        this.result = "";
        this.value = "";
        this.calculator = new Calculator();

        this.btn_clear.addEventListener('click', () => this.clear());
        this.btn_delete.addEventListener('click', () => this.delete());
        this.btn_dot.addEventListener('click', () => this.appendDot());
    }

    updateValue(value) {
        this.display_value.value = value;
    }

    updateResult(value) {

        switch (value) {
            case "+":
            case "-":
            case "/":
            case "x":
                if (this.value.length !== 0) {
                    this.result = this.value;
                    this.value = "";
                }
                this.display_result.value = this.result + " " + value;
                break;
            default:
                this.result = value;
                this.value = "";
                this.display_result.value = this.result;
        }

        this.updateValue(this.value);


    }

    clear() {
        this.result = "";
        this.value = "";
        this.display_result.value = "";
        this.display_value.value = "";
    }

    delete() {
        this.value = this.value.slice(0, -1);
        this.updateValue(this.value);
    }

    append(value) {
        this.value += value
        this.updateValue(this.value);
    }

    appendDot() {
        if (this.value.includes(".")) {
            return;
        }
        else if (this.value.length === 0) {
            this.value = "0.";
        }
        else {
            this.value += ".";
        }

        this.updateValue(this.value);

    }
}

//se crean instancias de las clases
const display = new Display();
const calculator = new Calculator();

//se asigna un evento click a cada boton numerico
btn_numbers.forEach(number => {
    number.addEventListener('click', () => display.append(number.dataset.value));
});

//se asigna un evento click a cada boton de operacoin
btn_operators.forEach(operator => {
    operator.addEventListener('click', () => {
            if(display.result !== "" || display.value !== ""){
                display.updateResult(operator.dataset.value);
            }
    });
});

btn_calculator.addEventListener('click', () => {
    let result;

    if (display.result !== "" && display.value !== "") {
        let operator = display.display_result.value.slice(-1);
        switch (operator) {
            case "+":
                result = calculator.addition(parseInt(display.result), parseInt(display.value));
                break;
            case "-":
                result = calculator.subtraction(parseInt(display.result), parseInt(display.value));
                break;
            case "x":
                result = calculator.multiplication(parseInt(display.result), parseInt(display.value));
                break;
            case "/":
                result = calculator.division(parseInt(display.result), parseInt(display.value));
                break;
        }

        display.updateResult(result);
    }


});




