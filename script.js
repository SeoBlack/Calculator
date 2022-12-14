//-------------variables------------
let numPad = document.querySelectorAll(".num");
let currentNum = document.querySelector(".current-num");
let resultText = document.querySelector(".result-txt");
let clearBtn = document.querySelector(".clear");
let deleteBtn = document.querySelector(".delete");
let operators = ['+','-','x','÷','='];
let numbersToCalculate = [];
let number = '';
let operator = '';
let result = 0;
let currentEvent;

//-------------Functions------------
function add(a,b){
    return a +  b;
}
function subtract(a,b){
    return a - b;
}
function multiply(a,b){
    return a *  b;
}
function divide(a,b){
    return a /  b;
}
function operate(operator , a , b){
    if (operator === "+")
        return add(a,b);
    else if( operator === "-")
        return subtract(a,b);
    else  if(operator === "x")
        return multiply(a,b);
    else if(operator === "÷")
        return divide(a,b);
}
function evaluate(){
    pushNumber();
    if(operator){
        if(numbersToCalculate.length === 2){
            //calculate the two numbers and save it to results
            result  = operate(operator,numbersToCalculate[0],numbersToCalculate[1]);
            //display results
            resultText.textContent = `${result}`;
            //clear the array and store result as the first element for further calculations.
            numbersToCalculate = [result];
        }

    }
}
function pushNumber(){
    //if number is not empty.
    if(number !== ''){
        //push the current number to an array for later use.
        numbersToCalculate.push(parseFloat(number));
        currentNum.textContent = '0';
        number = '';
        showOperation();
        return;
    }
}
function display(e){
    //using same function for both types of events
    if(e.type === 'keydown')
        currentEvent = e.key;
    else if (e.type === 'click')
        currentEvent = e.target.textContent
        
    //if user inputed an operator.
    if(operators.find(element => element === currentEvent)){

        pushNumber();
        //resetting the number var after we pushed it.

        evaluate()
        
        //if operator is not empty and we have TWO numbers in our array 

        operator = currentEvent;
        //just display the first number and the operator when found.
        showOperation();

    }
    //if user enters a number just concat it with number and display
    if( currentEvent >= 0 && currentEvent <= 9){
        
        number += `${currentEvent}`
        currentNum.textContent = number;   
    }
    if(currentEvent === 'Enter' || currentEvent  ==='='){
        evaluate();
        operator = '=';
        showOperation();
    }
    if(currentEvent === 'Backspace'){
        deleteNumber();
    }
    if(currentEvent ==='Escape'){
        clear();
    }
    

    
}
function showOperation(){
    if(numbersToCalculate.length === 1){
        resultText.textContent = `${numbersToCalculate[0]} ${operator}`;
    }
}
function clear(){
    //Resetting every variable.
    number = '';
    numbersToCalculate = [];
    operator = '';
    currentNum.textContent = '0';
    resultText.textContent = '';

}
function deleteNumber(){
    //deleting the last char(-1) from a string.
    number = number.slice(0,-1);
    //if number after deletion is none just put 0.
    if(number === ''){
        currentNum.textContent = '0';
    }
    else{
       currentNum.textContent = number; 
    }
}
//-------------Listeners-----------------
//listening for numbers or operators.
numPad.forEach(num => {
    num.addEventListener('click',display)
});
window.addEventListener('keydown',display);
//listening for delete btn.
deleteBtn.addEventListener('click',deleteNumber);
//listen for clear btn.
clearBtn.addEventListener('click',clear)


