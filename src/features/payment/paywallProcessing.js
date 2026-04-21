let filledAmount;

export function loadPaywall() {
  const payBtn = document.getElementById("paySubmit");
  let payInput = document.getElementById("pay-input");
  let paymentAmoutMessage = document.getElementById("paymentAmoutMessage");

  payInput.addEventListener("input", (event) => {
    paymentAmoutMessage.textContent = event.target.value;
    filledAmount = payInput.value;
  });

  payBtn.addEventListener("click", waitingPaymentDialog);
}

function waitingPaymentDialog() {
  document.querySelector(".buttons-payment").style.display = "none";
  document.getElementById("pay-input").style.display = "none";
  document.getElementById("payment-status").style.display = "inline-block";
  document.getElementById("paymentWill").innerText =
    "Transfer exactly " + filledAmount + "$ to following address:";
  document.getElementById("paymentWallet").style.display = "block";
  interval();
}

async function checkPayment() {
  const response = await fetch(
    "https://api.trongrid.io/v1/accounts/TYAJwnpH72EvHYhfBLk4jfYrfb5a9ksXsT/transactions/trc20?limit=100&contract_address=TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t",
  );
  const data = await response.json();
  let expectedAmount = Math.trunc(filledAmount);

  const transaction = data.data.find((tx) => {
    const amount = Math.trunc(tx.value / 1_000_000); // USDT has 6 decimals
    const ageSeconds = (Date.now() - tx.block_timestamp) / 1000;
    return amount === expectedAmount && ageSeconds < 600; // within 10 min
  });
  return transaction;
}

function showPin() {
  document.getElementById("paymentWill").style.visibility = "hidden";
  document.getElementById("messageForUser").style.visibility = "hidden";
  document.getElementById("payment-status").textContent =
    "Payment detected: PIN is 998822";
}

function interval() {
  setInterval(async () => {
    const paid = await checkPayment();
    if (paid) {
      showPin();
    } else {
      console.log("not founded");
    }
  }, 10000);
}
