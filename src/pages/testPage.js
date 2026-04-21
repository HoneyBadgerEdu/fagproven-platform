import { dialog } from "../components/dialog.js";

export function test() {
  return `
  <div class="app-container">
      <div class="navigator-container">
        <p>Lege Fagprøve Plattform</p>
        <p><span id="questionCount"></span>/140</p>
        <button command="show-modal" commandfor="bug">🐛Rapportere feil</button>
        <dialog id="bug">
          <h3>🐛Rapportere test feil</h3>
          <div id="messageForUser"></div>
          <textarea
            id="messageText"
            placeholder="Test nmr er allerede hentet. Hva er feil med testen? f.e <bildet ikke vises>"
          ></textarea>
          <div>
            <button id="submitBtn" type="submit">Sende rapport</button>
            <button commandfor="bug" command="close">Lukk</button>
          </div>
        </dialog>
      </div>
      <div class="test-container">
        <h2>Test <span id="questionNumber"></span></h2>
        <p id="question"></p>
        <ul>
          <li>
            <input type="radio" id="radio0" name="option" value="0" /><label
              for="radio0"
              id="answer0"
            ></label
            ><br />
            <i id="explanation0"></i>
          </li>
          <li>
            <input type="radio" id="radio1" name="option" value="1" /><label
              for="radio1"
              id="answer1"
            ></label
            ><br />
            <i id="explanation1"></i>
          </li>
          <li>
            <input type="radio" id="radio2" name="option" value="2" /><label
              for="radio2"
              id="answer2"
            ></label
            ><br />
            <i id="explanation2"></i>
          </li>
          <li>
            <input type="radio" id="radio3" name="option" value="3" /><label
              for="radio3"
              id="answer3"
            ></label
            ><br />
            <i id="explanation3"></i>
          </li>
        </ul>
        <div class="image-container"><img id="image" /></div>
        <div class="nota-bene"><p id="notabene"></p></div>
        <button id="answerBtn">Svare</button>
        <div class="timer">
          <b><span id="minutes">240</span>:<span id="seconds">00</span></b>
        </div>
        <p id="isCorrect"></p>
      </div>
      <div class="bottom-buttons">
        <div>
          <button id="btnPrevQ">Forrige test</button>
          <button id="btnNextQ">Neste test</button>
        </div>
        <div>
          <button id="btnEnd">Ferdig</button>
        </div>
      </div>
    </div>`;
}
