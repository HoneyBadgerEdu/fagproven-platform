import {
  currentQuestionNumber,
  rightAnswer,
  alternativeRightAnswer,
  checkedAnswer,
  setCheckedAnswer,
  modus,
} from "../../state.js";

export let inputValue = document.querySelectorAll(`input[name="option"]`);
const testContainer = document.querySelector(".test-container");
const answerButton = document.getElementById("answerBtn");

export let storedAnswers = [];

//push answer in array that stores answers
export function pushAnswerInArray() {
  let existingAnswer = storedAnswers.find(
    (item) => item.currentQuestionNumber === currentQuestionNumber,
  );
  if (existingAnswer == storedAnswers.currentQuestionNumber) {
    storedAnswers.push({
      currentQuestionNumber,
      checkedAnswer,
      rightAnswer,
      alternativeRightAnswer,
    });
  }
}

//after answer button pressed evaluation of further marking of right answer
function markAnswer() {
  if (modus == "trening") {
    inputValue.forEach((option) => {
      if (
        option.value == rightAnswer ||
        option.value == alternativeRightAnswer
      ) {
        option.classList.add("correct");
      } else if (option.value == checkedAnswer) {
        option.classList.add("wrong");
      }
      if (option.value == checkedAnswer) {
        option.checked = true;
      }
    });
  } else if (modus == "exam") {
    inputValue.forEach((option) => {
      if (option.value == checkedAnswer) {
        option.checked = true;
      }
    });
  }
}

export function checkIfCorrect() {
  if (modus == "trening") {
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
    answerButton.style = "display: none";
    testContainer.style = "pointer-events: none";
    let explanation = document.querySelectorAll("i");
    for (let h = 0; h < explanation.length; h++) {
      explanation[h].style = "display: block";
    }
    if (notabene.innerText !== "undefined") {
      notabene.style = "display:block";
    }
  } else if (modus == "exam") {
    if (checkedAnswer == undefined) {
      window.alert("Svaret må velges");
      return;
    }
    pushAnswerInArray();
    answerButton.style = "display: none";
    testContainer.style = "pointer-events: none";
  }
}

export function checkRadioIfAnswered() {
  let existingAnswer = storedAnswers.find(
    (item) => item.currentQuestionNumber === currentQuestionNumber,
  );
  setTimeout(() => {
    if (existingAnswer != undefined) {
      setCheckedAnswer(existingAnswer.checkedAnswer);
      markAnswer();
      checkIfCorrect();
      answerButton.style = "display: none";
    }
  }, 50);
}
