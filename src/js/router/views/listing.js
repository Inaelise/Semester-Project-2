import { viewListing } from "../../ui/listing/viewListing";
import { onBid } from "../../ui/listing/bid";
import { activeUser } from "../../utilities/activeUser";

const form = document.forms.makeBid;
const bidBtn = document.getElementById("bid-button");
const loginMessage = document.getElementById("login-message");
const user = activeUser();

//Updates the bid form based on login status
function updateFormState() {
  if (!user) {
    bidBtn.disabled = true;
    loginMessage.classList.add("hover", "hover:shadow-none");
    loginMessage.innerHTML = `<i class="fa-solid fa-circle-exclamation text-secondary"></i><a class="text-small hover:text-secondary" href="/auth/login/">Log in to make a bid</a>`;
  } else {
    bidBtn.disabled = false;
    loginMessage.textContent = "";
  }
}

form.addEventListener("submit", onBid);
updateFormState();
viewListing();
