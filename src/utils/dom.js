import { inputValue} from "../features/test/testAnswersManagment.js";
import { setCheckedAnswer, setRightAnswer } from "../state.js";
const testContainer = document.querySelector(".test-container");
const answerButton = document.getElementById("answerBtn")

export function clearHTML() {
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
  answerButton.style = "display:block"
  document.getElementById("image").style = "display:none";
  setCheckedAnswer(undefined);
  setRightAnswer(null);
  testContainer.style = "display: none";
  isCorrect.innerHTML = "";
  testContainer.style = "pointer-events: auto";
  let input = document.querySelectorAll("input");
  for (let i = 0; i < input.length; i++) {
    input[i].checked = false;
  }
  notabene.style = "display:none";
}