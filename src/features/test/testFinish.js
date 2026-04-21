import { finishedByTimer } from "../../state.js";
import { testFinished } from "../../pages/resultsPage.js";

export function endTestEvaluation() {
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
}
