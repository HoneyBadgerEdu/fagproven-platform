import grayMatter from "https://cdn.jsdelivr.net/npm/gray-matter@4.0.3/+esm";
import { clearHTML } from "../../utils/dom.js";
import { storedAnswers, pushAnswerInArray } from "./testAnswersManagment.js";
import {
  testYear,
  arrayOfRandomedQ,
  currentQuestionNumber,
  setCurrentQuestionNumber,
  setRightAnswer,
  rightAnswer,
  setAlternativeRightAnswer,
  alternativeRightAnswer,
  setTestFileName,
  checkedAnswer,
  setCheckedAnswer,
} from "../../state.js";
import {
  AnswerButton,
  NextButton,
  PreviousButton,
  EndButton,
} from "../../components/buttons.js";

import {
  endTestEvaluation,
  nextTestEvaluation,
  prevTestEvaluation,
} from "./testNavigationButtons.js";

const appContainer = document.querySelector(".app-container");
const testContainer = document.querySelector(".test-container");
const resultsContainer = document.querySelector(".results-container");
const messageDiv = document.getElementById("messageForUser");
const usersMessage = document.getElementById("messageText");

let isCorrect = document.getElementById("isCorrect");
let notabene = document.getElementById("notabene");

export async function loadTestTrening() {
  let questionCount = document.getElementById("questionCount");
  questionCount.innerHTML = currentQuestionNumber + 1;
  let questionNumber = document.getElementById("questionNumber");
  questionNumber.innerHTML = arrayOfRandomedQ[currentQuestionNumber];

  //fetch test from markdown

  const testMarkdown = await fetch(
    `./test-database/${testYear}/${arrayOfRandomedQ[currentQuestionNumber]}.md`,
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
  setRightAnswer(parsedData.data.rightAnswer);
  setAlternativeRightAnswer(parsedData.data.alternativeRightAnswer);

  notabene.innerHTML = parsedData.data.notabene;

  //image processing
  let markDownImg = parsedData.data.image;
  let testImage = document.getElementById("image");

  if (markDownImg !== undefined) {
    testImage.src = parsedData.data.image;
    testImage.style = "display:block";
  }
  //for debug dialog
  setTestFileName(testYear + " " + arrayOfRandomedQ[currentQuestionNumber]);
}

//PRESS ANSWER
function markAnswer() {
  inputValue.forEach((option) => {
    if (option.value == rightAnswer || option.value == alternativeRightAnswer) {
      option.classList.add("correct");
    } else if (option.value == checkedAnswer) {
      option.classList.add("wrong");
    }
    if (option.value == checkedAnswer) {
      option.checked = true;
    }
  });
}

function checkIfCorrectT() {
  if (checkedAnswer == undefined) {
    window.alert("Svaret må velges");
    return;
  } else if (
    rightAnswer == checkedAnswer ||
    alternativeRightAnswer == checkedAnswer
  ) {
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
  if (alternativeRightAnswer != undefined) {
    notabene.style = "display:block";
  }
}

function checkRadioIfAnsweredT() {
  let existingAnswer = storedAnswers.find(
    (item) => item.currentQuestionNumber === currentQuestionNumber,
  );
  setTimeout(() => {
    if (existingAnswer != undefined) {
      setCheckedAnswer(existingAnswer.checkedAnswer);
      markAnswer();
      checkIfCorrectT();
    }
  }, 50);
}
