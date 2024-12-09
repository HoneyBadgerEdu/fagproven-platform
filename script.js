import grayMatter from "https://cdn.jsdelivr.net/npm/gray-matter@4.0.3/+esm";

let testYear;
let currentQuestionNumber = 0;
let rightAnswer;

let arrayOfRandomedQ = randomizeArray();

//most used elements
const introContainer = document.querySelector(".intro-container");
const appContainer = document.querySelector(".app-container");
const testContainer = document.querySelector(".test-container");
const resultsContainer = document.querySelector(".results-container");

//start test
const btnStart = document.getElementById("btnStart");
let chosenTestYear = document.querySelectorAll(`input[name="testYear"]`);
btnStart.addEventListener("click", function () {
  chosenTestYear.forEach((option) => {
    if (option.checked) {
      testYear = option.value;
    }
  });
  if (testYear == undefined) {
    window.alert("Du skal velge året");
    return;
  }
  setTimeout(() => {
    introContainer.style = "display: none";
    appContainer.style = "display: block";
    loadTest();
  }, 100);
  randomizeArray();
  btnPrevQ.style = "display:none";
});

async function loadTest() {
  console.log(currentQuestionNumber);
  let questionCount = document.getElementById("questionCount");
  questionCount.innerHTML = currentQuestionNumber + 1;
  let questionNumber = document.getElementById("questionNumber");
  questionNumber.innerHTML = arrayOfRandomedQ[currentQuestionNumber];

  //fetch test from markdown

  const testMarkdown = await fetch(
    `./test-database/${testYear}/${
      arrayOfRandomedQ[currentQuestionNumber]
    }.md`
  );

  const testContent = await testMarkdown.text();

  //grayMatter `frontmatter` parsing
  const parsedData = grayMatter(testContent);

  question.innerHTML = parsedData.data.question;

  answer0.innerHTML = parsedData.data.answer0;
  explanation0.innerText = parsedData.data.explanation0;
  answer1.innerHTML = parsedData.data.answer1;
  explanation1.innerText = parsedData.data.explanation1;
  answer2.innerHTML = parsedData.data.answer2;
  explanation2.innerText = parsedData.data.explanation2;
  answer3.innerHTML = parsedData.data.answer3;
  explanation3.innerText = parsedData.data.explanation3;
  rightAnswer = parsedData.data.rightAnswer;

  //image processing
  let markDownImg = parsedData.data.image;
  let testImage = document.getElementById("image");

  if (markDownImg !== undefined) {
    testImage.src = parsedData.data.image;
    testImage.style = "display:block";
  }
}

//randomize question
function randomizeArray() {
  let numbers = [];
  for (let i = 1; i <= 140; i++) {
    numbers.push(i);
  }
  let uniqueNumbersArray = [];
  while (numbers.length > 0) {
    let randomIndex = Math.floor(Math.random() * numbers.length);
    let chosenNumber = numbers.splice(randomIndex, 1)[0];
    uniqueNumbersArray.push(chosenNumber);
  }
  return uniqueNumbersArray;
}

//PRESSING ANSWER BUTTON
//check which radio is checked
let answerBtn = document.getElementById("answerBtn");
const inputValue = document.querySelectorAll(`input[name="option"]`);
let checkedAnswer;
function checkedRadio() {
  inputValue.forEach((option) => {
    if (option.checked) {
      checkedAnswer = option.value;
    }
  });
}
//mark right answer with check, wrong with cross
function markAnswer() {
  inputValue.forEach((option) => {
    if (option.value == rightAnswer) {
      option.classList.add("correct");
    } else if (option.value == checkedAnswer) {
      option.classList.add("wrong");
    }
    if (option.value == checkedAnswer) {
      option.checked = true;
    }
  });
}
//push answer in array that stores answers
let storedAnswers = [];
function pushAnswerInArray() {
  let existingAnswer = storedAnswers.find(
    (item) => item.currentQuestionNumber === currentQuestionNumber
  );
  if (existingAnswer == storedAnswers.currentQuestionNumber) {
    storedAnswers.push({ currentQuestionNumber, checkedAnswer, rightAnswer });
  }
}
//check if answer right + remove poiner event
let isCorrect = document.getElementById("isCorrect");
answerBtn.addEventListener("click", checkIfCorrect);
function checkIfCorrect() {
  checkedRadio();
  if (checkedAnswer == undefined) {
    window.alert("Необхідно обрати відповідь");
    return;
  } else if (rightAnswer == checkedAnswer) {
    markAnswer();
    isCorrect.innerHTML = "Svaret er riktig";
    isCorrect.style = "color:green";
  } else {
    markAnswer();
    isCorrect.innerHTML = "Svaret er feil";
    isCorrect.style = "color:darkred";
  }
  pushAnswerInArray();
  testContainer.style = "pointer-events: none";
  let explanation = document.querySelectorAll("i");
  for (let h = 0; h < explanation.length; h++) {
    explanation[h].style = "display: block";
  }
}
//check if answer was already in aswered (after pressing next, prev buttons), if yes show answer
function checkIfWasAnswered() {
  let existingAnswer = storedAnswers.find(
    (item) => item.currentQuestionNumber === currentQuestionNumber
  );
  setTimeout(() => {
    if (existingAnswer) {
      checkedAnswer = existingAnswer.checkedAnswer;
      markAnswer();
      checkIfCorrect();
    }
  }, 100);
}

//CLEAR HTML BEFORE PRESSING NEXT/PREV BUTTONS
function clearHTML() {
  document.getElementById("questionNumber").innerHTML = "";
  question.innerHTML = "";
  let answerx = document.querySelectorAll("label");
  for (let c = 0; c < answerx.length; c++) {
    answerx[c].innerHTML = "";
  }
  inputValue.forEach((option) => {
    option.classList.remove("correct", "wrong");
  });
  let explanation = document.querySelectorAll("i");
  for (let h = 0; h < explanation.length; h++) {
    explanation[h].innerText = "";
    explanation[h].style = "display:none";
  }
  document.getElementById("image").style = "display:none";
  checkedAnswer = undefined;
  rightAnswer = null;
  testContainer.style = "display: none";
  isCorrect.innerHTML = "";
  testContainer.style = "pointer-events: auto";
  let input = document.querySelectorAll("input");
  for (let i = 0; i < input.length; i++) {
    input[i].checked = false;
  }
}

//PRESS "NEXT"
let btnNextQ = document.getElementById("btnNextQ");
btnNextQ.addEventListener("click", function () {
  clearHTML();
  if (currentQuestionNumber != 139) {
    currentQuestionNumber++;
    btnNextQ.style = "display: inline-block"
    btnPrevQ.style = "display:inline-block"
  }
  if (currentQuestionNumber == 139){
    btnNextQ.style = "display:none"
  }
  loadTest();
  checkIfWasAnswered();
});

//PRESS "PREV"
let btnPrevQ = document.getElementById("btnPrevQ");
btnPrevQ.addEventListener("click", function () {
  clearHTML();
  if (currentQuestionNumber != 0) {
    currentQuestionNumber--;
    btnPrevQ.style = "display:inline-block"
    btnNextQ.style = "display: inline-block"
  }
  if (currentQuestionNumber == 0){
    btnPrevQ.style = "display:none"
  }
  loadTest();
  checkIfWasAnswered();
});

//PRESS "END"
let btnEnd = document.getElementById("btnEnd");
let result = document.getElementById("result");
let correctAnswers = 0;
btnEnd.addEventListener("click", function () {
  let finishedQuestion = window.confirm("Har du svaret på alle spørsmål?");
  if (finishedQuestion) {
    appContainer.style = "display: none";
    resultsContainer.style = "display: block";
    storedAnswers.forEach((answer) => {
      if (answer.checkedAnswer == answer.rightAnswer) {
        correctAnswers++;
      }
    });
    result.innerHTML = `Du har: ${Math.round(
      (correctAnswers * 100) / 140
    )}%</br>Riktig svarer: ${correctAnswers} av 140`;
  } else {
    return;
  }
});
