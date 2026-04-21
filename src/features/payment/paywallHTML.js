export function paywallDialog() {
  return `
<dialog id="pay">
  <h3>Pay in USDT (TRC20)</h3>
  <div id="messageForUser">Don't refresh/leave this page during the transfer operation. Operation will be processed 
  and PIN showed afterwards. Important: choose only USDT TRC20 network to avoid loss of funds. 
  It usually takes 3 mins for transaction to finish. Amount more then 1$ is needed to be detected. 
  If there are any problems don't hesitate to take contact.</div>
  <b><p id="payment-status" style="display: none">Waiting for payment...</p></b>
  <input type="number" id="pay-input" required="true" min="2" placeholder="Enter the amount in USD$"></input>
  <p id="paymentWill"><b>You are willing to contribute: <span id="paymentAmoutMessage">0</span>$</b></p>
  <input id="paymentWallet" style ="display: none; width: 80%; height: 1.5rem" type="text" value="TYAJwnpH72EvHYhfBLk4jfYrfb5a9ksXsT" readonly onclick="this.select();">
  <div class="buttons-payment">
    <button commandfor="pay" id="paySubmit">
      Next
    </button>
    <button commandfor="pay" command="close">
      Close
    </button>
  </div>
</dialog>`;
}
