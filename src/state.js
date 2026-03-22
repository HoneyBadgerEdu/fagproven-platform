export let rightAnswer;
export let alternativeRightAnswer;
export let testYear;
export let currentQuestionNumber = 0;
export let modus;
export let testFileName; //for feedback
export let arrayOfRandomedQ;
export let storedAnswers = [];
export let checkedAnswer;
export let timer = 14400;
export let finishedByTimer;

export function setRightAnswer(value) {
  rightAnswer = value;
}
export function setAlternativeRightAnswer(value) {
  alternativeRightAnswer = value;
}
export function setTestYear(value) {
  testYear = value;
}
export function setCurrentQuestionNumber(value) {
  currentQuestionNumber = value;
}
export function setModus(value) {
  modus = value;
}
export function setTestFileName(value) {
  testFileName = value;
}
export function setArrayOfRandomedQ(value) {
  arrayOfRandomedQ = value;
}
export function setCheckedAnswer(value) {
  checkedAnswer = value;
}
export function setTimer(value) {
  timer = value;
}
export function setFinishedByTimer(value) {
  finishedByTimer = value;
}
