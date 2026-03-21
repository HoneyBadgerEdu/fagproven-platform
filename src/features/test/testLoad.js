import grayMatter from "https://cdn.jsdelivr.net/npm/gray-matter@4.0.3/+esm";
import {
  modus,
  testYear,
  arrayOfRandomedQ,
  currentQuestionNumber,
  setCurrentQuestionNumber,
  setRightAnswer,
  rightAnswer,
  setAlternativeRightAnswer,
  alternativeRightAnswer,
  setTestFileName,
  checkedAnswer,
  setCheckedAnswer,
} from "../../state.js";

const testContainer = document.querySelector(".test-container");

import { loadButtons } from "./testNavigationButtons.js";

export async function loadTest() {
  try {
    testContainer.style.opacity = "0";
    testContainer.style.visibility = "hidden";
    let questionCount = document.getElementById("questionCount");
    questionCount.innerHTML = currentQuestionNumber + 1;
    let questionNumber = document.getElementById("questionNumber");
    questionNumber.innerHTML = arrayOfRandomedQ[currentQuestionNumber];

    //fetch test from markdown

    const testMarkdown = await fetch(
      `./test-database/${testYear}/${arrayOfRandomedQ[currentQuestionNumber]}.md`,
    );

    const testContent = await testMarkdown.text();

    //grayMatter `frontmatter` parsing
    const parsedData = grayMatter(testContent);

    question.innerHTML = parsedData.data.question;

    answer0.innerHTML = parsedData.data.answer0;
    answer1.innerHTML = parsedData.data.answer1;
    answer2.innerHTML = parsedData.data.answer2;
    answer3.innerHTML = parsedData.data.answer3;

    if (modus == "trening") {
      explanation0.innerText = parsedData.data.explanation0;
      explanation1.innerText = parsedData.data.explanation1;
      explanation2.innerText = parsedData.data.explanation2;
      explanation3.innerText = parsedData.data.explanation3;
      notabene.innerText = parsedData.data.notabene;
    }
    setRightAnswer(parsedData.data.rightAnswer);
    setAlternativeRightAnswer(parsedData.data.alternativeRightAnswer);

    //image processing
    let markDownImg = parsedData.data.image;
    let testImage = document.getElementById("image");

    if (markDownImg !== undefined) {
      testImage.src = parsedData.data.image;
      testImage.style = "display:block";
    }
    //for debug dialog
    setTestFileName(testYear + " " + arrayOfRandomedQ[currentQuestionNumber]);
    loadButtons();
  } catch (err) {
    console.error();
    question.innerHTML = "Error loading test";
  } finally {
    testContainer.style.opacity = "1";
    testContainer.style.visibility = "visible";
  }
}
