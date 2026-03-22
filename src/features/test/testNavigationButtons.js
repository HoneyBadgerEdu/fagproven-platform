import {
  setCurrentQuestionNumber,
  currentQuestionNumber,
  setCheckedAnswer,
  modus,
} from "../../state.js";
import { clearHTML } from "../../utils/dom.js";
import { loadTest } from "./testLoad.js";
import {
  storedAnswers,
  checkIfCorrect,
  checkRadioIfAnswered,
  inputValue,
} from "./testAnswersManagment.js";
import {
  NextButton,
  PreviousButton,
  AnswerButton,
  EndButton,
} from "../../components/buttons.js";

import { endTestEvaluation } from "./testFinish.js";

const messageDiv = document.getElementById("messageForUser");
const usersMessage = document.getElementById("messageText");

export function nextTestEvaluation() {
  clearHTML();
  if (currentQuestionNumber != 139) {
    setCurrentQuestionNumber(currentQuestionNumber + 1);
    btnNextQ.style = "display: inline-block";
    btnPrevQ.style = "display: inline-block";
  }
  if (currentQuestionNumber == 139) {
    btnNextQ.style = "display:none";
  }
  btnNextQ.style = "pointer-events:none";
  loadTest();
  checkRadioIfAnswered();
  setTimeout(() => {
    btnNextQ.style = "pointer-events:auto";
  }, 400);
  messageDiv.innerHTML = "";
  usersMessage.value = "";
}
NextButton(nextTestEvaluation);

export function prevTestEvaluation() {
  clearHTML();
  if (currentQuestionNumber !== 0) {
    setCurrentQuestionNumber(currentQuestionNumber - 1);
    btnPrevQ.style = "display: inline-block";
    btnNextQ.style = "display: inline-block";
  }
  if (currentQuestionNumber == 0) {
    btnPrevQ.style = "display: none";
  }
  btnPrevQ.style = "pointer-events:none";
  loadTest();
  checkRadioIfAnswered();
  setTimeout(() => {
    btnPrevQ.style = "pointer-events:auto";
  }, 400);
  messageDiv.innerHTML = "";
  usersMessage.value = "";
}
PreviousButton(prevTestEvaluation);

export function answerTestEvaluation() {
  inputValue.forEach((option) => {
    if (option.checked) {
      setCheckedAnswer(option.value);
    }
  });
  checkIfCorrect();
}
AnswerButton(answerTestEvaluation);

//go to testFinish
EndButton(endTestEvaluation);

export function loadButtons() {
  NextButton(nextTestEvaluation);
  PreviousButton(prevTestEvaluation);
  AnswerButton(answerTestEvaluation);
}
