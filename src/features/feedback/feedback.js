import { testFileName } from "../../state.js";

export function loadFeedback() {
  //for feedback
  const messageDiv = document.getElementById("messageForUser");
  const usersMessage = document.getElementById("messageText");

  //SEND REPORT
  const WORKER_URL = "https://legen-feedback.user27384.workers.dev/";

  const submitBtn = document.getElementById("submitBtn");

  function showMessage(text, type) {
    messageDiv.textContent = text;
    messageDiv.className = `message ${type} show`;
    setTimeout(() => {
      messageDiv.classList.remove("show");
    }, 5000);
  }

  submitBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    const dialogData = {
      name: testFileName,
      message: usersMessage.value,
    };
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    try {
      const response = await fetch(WORKER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dialogData),
      });

      const data = await response.json();

      if (response.ok) {
        showMessage(
          "Tusen takk! Det ble sendt. Blir fikset om 3-5 dager",
          "success",
        );
      } else {
        showMessage(
          data.error || "Something went wrong. Please try again.",
          "error",
        );
      }
    } catch (error) {
      showMessage(
        "Failed to send feedback. Please check your connection.",
        "error",
      );
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Sende rapport";
    }
  });
}
