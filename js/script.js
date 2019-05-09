"use strict";

const input = document.getElementById('input'), // input/output button
    numbers = document.querySelectorAll('.numbers div'), // number buttons
    operators = document.querySelectorAll('.operators div'), // operator buttons
    result = document.getElementById('result'), // equal button
    clear = document.getElementById('clear'); // clear button
    
let resultDisplayed = false; // flag to keep an eye on what output is displayed

// adding click handlers to number buttons
Array.from(numbers).map(number =>{
    number.addEventListener("click", function(){

        let currentString = input.innerHTML;
        let lastCharacter = currentString[currentString.length - 1];

        if (resultDisplayed === false){
            input.innerHTML += this.innerHTML;
        } else if (
            (resultDisplayed === true && lastCharacter === "+") ||
            (resultDisplayed === true && lastCharacter === "-") ||
            (resultDisplayed === true && lastCharacter === "*") ||
            (resultDisplayed === true && lastCharacter === "/")
    )

            {

            resultDisplayed = false;
            input.innerHTML += this.innerHTML;
        } else {

            resultDisplayed= false;
            input.innerHTML = "";
            input.innerHTML += this.innerHTML;

        }
    });
});

// adding click handlers to the operation buttons
operators.forEach(function(op){
    op.addEventListener('click', function(){
        let lastCharacter = input.innerHTML[input.innerHTML.length -1];
        if (lastCharacter === "+" || lastCharacter === "-" || lastCharacter === "*" || lastCharacter === "/"){
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
result.addEventListener('click', function(){
    input.innerHTML += 'no math';
});
// clearing the input on press of clear
clear.addEventListener('click', function(){
    input.innerHTML = '';
});
