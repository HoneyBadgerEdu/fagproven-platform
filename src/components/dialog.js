export function dialog(id, title,inputHTML, sendtext) {
    document.getElementsByClassName("dialog")
    return `<button command="show-modal" commandfor="${id}">${title}</button>
        <dialog id="${id}">
          <h3>${title}</h3>
          <div id="messageForUser">${userMsg}</div>
          <textarea
            id="messageText"
          ></textarea>
          <div>
            <button id="submitBtn" type="submit">${sendtext}</button>
            <button commandfor="${id}" command="close">Lukk</button>
          </div>
        </dialog>`
}