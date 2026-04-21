import {
  setCurrentQuestionNumber,
  currentQuestionNumber,
  setCheckedAnswer,
} from "../../state.js";
import { clearHTML } from "../../utils/dom.js";
import { loadTest } from "./testLoad.js";
import {
  checkIfCorrect,
  checkRadioIfAnswered,
} from "./testAnswersManagment.js";
import {
  NextButton,
  PreviousButton,
  AnswerButton,
  EndButton,
} from "../../components/buttons.js";

import { endTestEvaluation } from "./testFinish.js";

export function nextTestEvaluation() {
  const messageDiv = document.getElementById("messageForUser");
  const usersMessage = document.getElementById("messageText");
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

export function prevTestEvaluation() {
  const messageDiv = document.getElementById("messageForUser");
  const usersMessage = document.getElementById("messageText");
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

export function answerTestEvaluation() {
  document.querySelectorAll(`input[name="option"]`).forEach((option) => {
    if (option.checked) {
      setCheckedAnswer(option.value);
    }
  });
  checkIfCorrect();
}

export function loadButtons() {
  NextButton(nextTestEvaluation);
  PreviousButton(prevTestEvaluation);
  AnswerButton(answerTestEvaluation);
  EndButton(endTestEvaluation);
}
