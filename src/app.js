import { setArrayOfRandomedQ } from "./state.js";
import { loadStartPage } from "./pages/startPage.js";

addEventListener("DOMContentLoaded", () => {
  loadStartPage();
  randomizeArray();
});

export function randomizeArray() {
  let numbers = [];
  for (let i = 1; i <= 140; i++) {
    numbers.push(i);
  }
  let uniqueNumbersArray = [];
  while (numbers.length > 0) {
    let randomIndex = Math.floor(Math.random() * numbers.length);
    let chosenNumber = numbers.splice(randomIndex, 1)[0];
    uniqueNumbersArray.push(chosenNumber);
  }
  return setArrayOfRandomedQ(uniqueNumbersArray);
}
