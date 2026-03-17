//Next Button
export function NextButton(onClick) {
  const nextBtn = document.getElementById("btnNextQ");
  nextBtn.addEventListener("click", onClick);
}

//Previous Button

export function PreviousButton(onClick) {
  const prevBtn = document.getElementById("btnPrevQ");
  prevBtn.addEventListener("click", onClick)
}

//Answer Button

export function AnswerButton(onClick){
    const answerBtn = document.getElementById("answerBtn");
    answerBtn.addEventListener("click", onClick)
}

//End Button
export function EndButton(onClick) {
    const endBtn = document.getElementById("btnEnd");
    endBtn.addEventListener("click", onClick)
}