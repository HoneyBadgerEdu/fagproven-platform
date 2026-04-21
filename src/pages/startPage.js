import { loadTest } from "../features/test/testLoad.js";
import { testYear, setTestYear, modus, setModus } from "../state.js";
import { loadTimer } from "../features/test/testTimer.js";
import { render } from "../router.js";
import { test } from "./testPage.js";
import { loadFeedback } from "../features/feedback/feedback.js";
import { paywallDialog } from "../features/payment/paywallHTML.js";
import { loadPaywall } from "../features/payment/paywallProcessing.js"


export function startPage() {
  return `<div class="intro-container">
      <h1>Lege Fagprøve Plattform</h1>
      <p>
        På denne plattformen kan du øve til fagprøven for leger. <br />
        <b>Hvordan det fungerer?</b> <br />
        Du får 140 spørsmål fra tiddligere fagprøvene, og de vises i tilfeldig
        rekkefølge.<br />
        Testnummeret tilsvarer nummeret fra testblanken. <br />
        I <u>treningsmodus</u> mottar du prøveløsningen etter svaret.<br />
        I <u>eksamensmodus</u> får du ingen prøveløsning og det er
        tidsbegrensning på 4 timer (som i en virkelig eksamen). <br />
        På slutten kan du se resultatet sitt.<br />
        Klikk på timer så det blir usynlig, klikk igjen for å se. <br />
        Tilgang til <u>Høst 2025</u> ved bidrag. Du velger selv
        hvor mye vil du gi. Pengene brukes for å bevare domain og hosting av
        nettsiden. <button id="payLink">Klikk</button>
        <br />
        <b>Hva med neste testblanken?</b> <br />
        For tiden i arbeid: <b>Vår 2024</b><br />
        Forventet ferdigstillelsesdato: <b>31.05.2026 - 31.08.2026</b> <br />
        Dette er frivillig projekt, så det tar tid.<br />
        Våren 2023 tester laget av <b>Liudmyla Naumenko.</b><br />
        Har spørsmål - ta gjerne kontakt via Telegram:
        <a href="https://t.me/cat_scan">@cat-scan</a> <br />
        Eller e-mail:
        <a href="mailto:contact@norgelege.com">contact@norgelege.com</a> <br />
      </p>
      <h2>Klikk på ønsket år, og start deretter testingen.<br /></h2>
      <ul>
        <li>
          <input
            type="radio"
            id="var2022"
            value="var2022"
            name="testYear"
          /><label for="var2022">Vår 2022</label>
        </li>
        <li>
          <input
            type="radio"
            id="host2022"
            value="host2022"
            name="testYear"
          /><label for="host2022">Høst 2022</label>
        </li>
        <li>
          <input
            type="radio"
            id="var2023"
            value="var2023"
            name="testYear"
          /><label for="var2023">Vår 2023</label>
        </li>
        <li>
          <input
            type="radio"
            id="host2023"
            value="host2023"
            name="testYear"
          /><label for="host2023">Høst 2023</label>
        </li>
        <li>
          <input
            type="radio"
            id="host2025"
            value="host2025"
            name="testYear"
          /><label for="host2025">Høst 2025 (PIN kreves)</label>
        </li>
      </ul>
      <h2>Velge modus</h2>
      <ul>
        <li>
          <input type="radio" name="modus" id="trening" value="trening" /><label
            for="trening"
            >Trening modus</label
          >
        </li>
        <li>
          <input type="radio" name="modus" id="exam" value="exam" /><label
            for="exam"
            >Eksamen modus</label
          >
        </li>
      </ul>
      <button id="btnStart">Start</button>
      <dialog id="pin">
          <h3>PIN kode</h3>
          <div id="messageForUser"></div>
          <input
            type="number"
            id="pin-input"
            placeholder="Skriv PIN kode her"
          ></input>
          <div class="buttons-container">
            <button commandfor="pin" command="close" id="pinSubmit" type="submit" class="pinButton">Start</button>
            <button commandfor="pin" command="close" class="pinButton">Lukk</button>
          </div>
        </dialog>
        ${paywallDialog()}
    </div>`;
}

export function loadStartPage() {
  const btnStart = document.getElementById("btnStart");

  let chosenTestYear = document.querySelectorAll('input[name="testYear"]');
  let chosenModus = document.querySelectorAll('input[name="modus"]');
  const pinSubmit = document.getElementById("pinSubmit");
  const pinDialog = document.getElementById("pin");
  let pinInput = document.getElementById("pin-input");
  let pin;

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
    // MANAGING PIN
    if (testYear == "host2025") {
      pinDialog.showModal();
    } else {
      Begin();
    }
  });

  pinSubmit.addEventListener("click", () => {
    pin = pinInput.value;
    if (pin !== "998822") {
      pinInput.value = "";
      window.alert("Feil PIN");
      return;
    } else {
      Begin();
    }
  });
  // MANAGING PAYMENT
  let payLink = document.getElementById("payLink");
  let payDialog = document.getElementById("pay");
  payLink.addEventListener("click", () => {
    payDialog.showModal();
    loadPaywall();
  });
}

function Begin() {
  render(test);
  loadTest();
  loadTimer();
  loadFeedback();
}
