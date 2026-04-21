import { storedAnswers } from "../features/test/testAnswersManagment.js";

export function testFinished() {
  console.log(storedAnswers)
  const app = document.getElementById("app");
  const appContainer = document.querySelector(".app-container");
  let correctAnswers = 0;
  app.innerHTML = `<div class="results-container">
      <h2 id="result"></h2>
      <h4>For å bestå må du ha mer enn ~63%</h4>
      <a href="./">Gå til start</a>
    </div>`;
  const resultsContainer = document.querySelector(".results-container");
  appContainer.style.display = "none";
  resultsContainer.style.display = "block";
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
  )}%</br>Riktige svarer: ${correctAnswers} av 140`;
}
