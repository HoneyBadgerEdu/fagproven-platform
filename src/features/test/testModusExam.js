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

const appContainer = document.querySelector(".app-container");
const testContainer = document.querySelector(".test-container");
const resultsContainer = document.querySelector(".results-container");
const messageDiv = document.getElementById("messageForUser");
const usersMessage = document.getElementById("messageText");

let isCorrect = document.getElementById("isCorrect");
let notabene = document.getElementById("notabene");

//export let inputValue = document.querySelectorAll(`input[name="option"]`);

import { nextTestEvaluation, prevTestEvaluation, endTestEvaluation, answerTestEvaluation } from "./testNavigationButtons.js";

export async function loadTestExam() {
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
  answer1.innerHTML = parsedData.data.answer1;
  answer2.innerHTML = parsedData.data.answer2;
  answer3.innerHTML = parsedData.data.answer3;
  setRightAnswer(parsedData.data.rightAnswer);
  setAlternativeRightAnswer(parsedData.data.alternativeRightAnswer);

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
