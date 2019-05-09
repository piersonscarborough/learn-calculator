"use strict";

const input = document.getElementById('input'), // input/output button
    numbers = document.querySelectorAll('.numbers div'), // number buttons
    operators = document.querySelectorAll('.operators div'), // operator buttons
    result = document.getElementById('result'), // equal button
    clear = document.getElementById('clear'); // clear button
    
let resultDisplayed = false; // flag to keep an eye on what output is displayed

// adding click handlers to number buttons
numbers.forEach(function(num){
    num.addEventListener('click', function(){
        input.innerHTML += this.innerHTML;
    });
});

// adding click handlers to the operation buttons
operators.forEach(function(op){
    op.addEventListener('click', function(){
        let lastCharacter = input.innerHTML[input.innerHTML.length -1];
        if (lastCharacter === "+" || lastCharacter === "-" || lastCharacter === "×" || lastCharacter === "÷"){
            var newString = input.innerHTML.substring(0,input.innerHTML.length - 1) + this.innerHTML;
            input.innerHTML = newString;
        } 
        else if (input.innerHTML.length == 0){
            console.log("enter a number first");
        }
        else{
            input.innerHTML += this.innerHTML;
        };
    
    });
});
// on click of 'equal' button
result.addEventListener("click", function() {

    // this is the string that we will be processing eg. -10+26+33-56*34/23
    var inputString = input.innerHTML;

    // forming an array of numbers. eg for above string it will be: numbers = ["10", "26", "33", "56", "34", "23"]
    var numbers = inputString.split(/\+|\-|\×|\÷/g);

    // forming an array of operators. for above string it will be: operators = ["+", "+", "-", "*", "/"]
    // first we replace all the numbers and dot with empty string and then split
    var operators = inputString.replace(/[0-9]|\./g, "").split("");

    console.log(inputString);
    console.log(operators);
    console.log(numbers);
    console.log("----------------------------");

    // now we are looping through the array and doing one operation at a time.
    // first divide, then multiply, then subtraction and then addition
    // as we move we are alterning the original numbers and operators array
    // the final element remaining in the array will be the output

    var divide = operators.indexOf("÷");
    while (divide != -1) {
        numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
        operators.splice(divide, 1);
        divide = operators.indexOf("÷");
    }

    var multiply = operators.indexOf("×");
    while (multiply != -1) {
      numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
        operators.splice(multiply, 1);
        multiply = operators.indexOf("×");
    }

    var subtract = operators.indexOf("-");
    while (subtract != -1) {
        numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
        operators.splice(subtract, 1);
        subtract = operators.indexOf("-");
    }

    var add = operators.indexOf("+");
    while (add != -1) {
      // using parseFloat is necessary, otherwise it will result in string concatenation :)
        numbers.splice(add, 2, parseFloat(numbers[add]) + parseFloat(numbers[add + 1]));
        operators.splice(add, 1);
        add = operators.indexOf("+");
    }

    input.innerHTML = numbers[0]; // displaying the output

    resultDisplayed = true; // turning flag if result is displayed
});

  // clearing the input on press of clear
clear.addEventListener("click", function() {
    input.innerHTML = "";
})
// clearing the input on press of clear
clear.addEventListener('click', function(){
    input.innerHTML = '';
});
