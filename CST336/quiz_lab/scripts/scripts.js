document.querySelector("button").addEventListener("click", gradeQuiz);


shuffleQ1();
function shuffleQ1(){
    let q1Choices = ["select", "option", "dropdown", "menu"];
    shuffleArray(q1Choices);

    for(let i of q1Choices){
        let inputElement = document.createElement("input");
        inputElement.type = "radio";
        inputElement.name = "q1";
        inputElement.value = i;
    
        let labelElement = document.createElement("label");
        labelElement.textContent = i;
    
        labelElement.prepend(inputElement);
    
        document.querySelector("#q1Choices").append(labelElement);
        
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
         let j = Math.floor(Math.random() * (i + 1));
         [ array[i], array[j] ] = [ array[j], array[i] ];
     }
     return array;
}


function gradeQuiz(){
    // Grade question 1
    let q1Answer = "select"
    let userAnswerQ1 = document.querySelector("input[name=q1]:checked").value;
    
    if (userAnswerQ1 == q1Answer){
        document.querySelector("#q1Title").style.color = "green";
        console.log("That's correct!")
    } else {
        document.querySelector("#q1Title").style.color = "red";
    }

    //Grade question 2
    let userAnswerQ2 = document.querySelector("#q2").value;
    let q2Answer = "bee"

    if (userAnswerQ2.toLowerCase() == q2Answer){
        document.querySelector("#q2Title").style.color = "green";
        console.log("That's correct!")
    } else {
        document.querySelector("#q2Title").style.color = "red";
    }

    //Grade Question 4
    let userAnswerQ3 = +document.querySelector("#q4").value;
    let q3Answer = 4;
    if (userAnswerQ3 === q3Answer){
        document.querySelector("#q4Title").style.color = "green";
        console.log("That's correct!")
    } else {
        document.querySelector("#q4Title").style.color = "red";
    }

    console.log(userAnswerQ2);
}