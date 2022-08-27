const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operator]');
const equalsButton = document.querySelector('[data-equals]');

const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');

const previusOperantText = document.querySelector('#previusOperantion');
const currentOperantText = document.querySelector('#currentOperantion');

class Calculator {
    constructor(previusOperantText, currentOperantText){
        this.previusOperantText = previusOperantText;
        this.currentOperantText = currentOperantText;
        this.clear();
    }

    formatDisplayNumber(number){
        const stringNumber = number.toString();

        const interDigits = parseFloat(stringNumber.slice('.')[0]);
        const decimaDigits = stringNumber.split('.')[1]

        let interDisplay;

        if(isNaN(interDigits)){
            interDisplay = "";
        } else{
            interDisplay = interDigits.toLocaleString('en',{
                maximumFractionDigits : 0,
            });
        }

        if(decimaDigits != null){
            return `${interDisplay}.${decimaDigits}`
        } else{
          return interDisplay;  
        }
    }

    delete(){
        this.currentOperant = this.currentOperant.toString().slice(0, -1);
    }

    calculate(){
        let result;

        const _previusOperant = parseFloat(this.previusOperant);
        const _currentOperant = parseFloat(this.currentOperant);

        if(isNaN(_previusOperant) || isNaN(_currentOperant)) return;

        switch(this.operation){
            case "+" :
                result = _previusOperant + _currentOperant;
                break;
            case "-" :
                result = _previusOperant - _currentOperant;
                break;
            case "/" :
                result = _previusOperant / _currentOperant;
                break;
            case "*" :
                result = _previusOperant * _currentOperant;
                break;
            default :
                return;
        }

        this.currentOperant = result;
        this.operation = undefined;
        this.previusOperant = "";
    }

    chooseOperation(operation){
        if(this.currentOperant === '') return;

        if(this.previusOperant !== ""){
            this.calculate();
        }
        this.operation = operation;

        this.previusOperant = this.currentOperant;
        this.currentOperant = "";
    }

    appendNumber(number){
        if(this.currentOperant.includes('.') && number === '.') return;

        this.currentOperant = `${this.currentOperant}${number.toString()}`;
    }

    clear(){
        this.currentOperant = " ";
        this.previusOperant = " ";
        this.operation = undefined;
    }

    updateDisplay(){
        this.previusOperantText.innerText = `${this.formatDisplayNumber(this.previusOperant)}${this.operation || ""}`;
        this.currentOperantText.innerText = this.formatDisplayNumber(this.currentOperant);
    } 
}

const calculator = new Calculator(previusOperantText, currentOperantText);

for (const numberButton of numberButtons){
    numberButton.addEventListener("click", () => {
        calculator.appendNumber(numberButton.innerText);
        calculator.updateDisplay();
    })
}

for (const operationButton of operationButtons){
    operationButton.addEventListener("click", () => {
        calculator.chooseOperation(operationButton.innerText);
        calculator.updateDisplay();
    })
}

allClearButton.addEventListener("click", () => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
});