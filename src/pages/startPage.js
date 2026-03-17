import { loadTestTrening } from "../features/test/testModusTrening.js";
import { loadTestExam } from "../features/test/testModusExam.js";
import { testYear, setTestYear, modus, setModus } from "../state.js";

export function loadStartPage() {
  const introContainer = document.querySelector(".intro-container");
  const appContainer = document.querySelector(".app-container");
  const btnStart = document.getElementById("btnStart");

  let chosenTestYear = document.querySelectorAll('input[name="testYear"]');
  let chosenModus = document.querySelectorAll('input[name="modus"]');

  btnStart.addEventListener("click", function () {
    chosenTestYear.forEach((option) => {
      if (option.checked) {
        setTestYear(option.value);
      }
    });
    if (testYear == undefined) {
      window.alert("Du skal velge året");
      return;
    }
    chosenModus.forEach((option) => {
      if (option.checked) {
        setModus(option.value);
      }
    });
    if (modus == undefined) {
      window.alert("Du skal velge modus");
      return;
    }
    setTimeout(() => {
      introContainer.style = "display: none";
      appContainer.style = "display: block";
      checkModus();
    }, 200);
    btnPrevQ.style = "display:none";
  });

  function checkModus() {
    if (modus == "trening") {
      loadTestTrening();
    }
    if (modus == "exam") {
      loadTestExam();
    }
  }
}
