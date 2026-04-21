import { timer, setTimer, modus, setFinishedByTimer } from "../../state.js";
import { endTestEvaluation } from "./testFinish.js";

export function loadTimer() {
  let minsElement = document.getElementById("minutes");
  let secElement = document.getElementById("seconds");
  const timerElement = document.querySelector(".timer");
  timerElement.addEventListener("click", () => {
    timerElement.classList.toggle("opacity");
  });
  if (modus == "trening") {
    return;
  } else if (modus == "exam") {
    timerElement.style.display = "block";
    setInterval(() => {
      if (timer < 1) {
        setFinishedByTimer(true);
        endTestEvaluation();
      }
      setTimer(timer - 1);
      let minsTimer = Math.floor(timer / 60);
      minsElement.innerHTML = minsTimer;
      let secTimer = timer % 60;
      secElement.innerHTML = secTimer;
    }, 1000);
  }
}
