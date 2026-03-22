const appContainer = document.querySelector(".app-container");
const resultsContainer = document.querySelector(".results-container");

import { storedAnswers } from "./testAnswersManagment.js";
import { finishedByTimer } from "../../state.js";

export function endTestEvaluation() {
  const result = document.getElementById("result");
  let correctAnswers = 0;
  if (finishedByTimer !== true) {
    let finishedQuestion = window.confirm("Har du svaret på alle spørsmål?");
    if ((finishedQuestion = !undefined)) {
      testFinished();
    } else {
      return;
    }
  } else {
    testFinished();
  }

  function testFinished() {
    appContainer.style = "display: none";
    resultsContainer.style = "display: block";
    storedAnswers.forEach((answer) => {
      if (
        answer.checkedAnswer == answer.rightAnswer ||
        answer.checkedAnswer == answer.alternativeRightAnswer
      ) {
        correctAnswers++;
      }
    });
    result.innerHTML = `Du har: ${Math.round(
      (correctAnswers * 100) / 140,
    )}%</br>Riktig svarer: ${correctAnswers} av 140`;
  }
}
