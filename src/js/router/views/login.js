import { onLogin } from "../../ui/auth/login";
import { activeUser } from "../../utilities/activeUser";
import { displayMessage } from "../../utilities/displayMessage";

const form = document.forms.login;
const loginBtn = document.getElementById("login-btn");
const user = activeUser();

if (user) {
  displayMessage("message", "You're already logged in.", true);
  loginBtn.disabled = true;
  loginBtn.classList.add(
    "disabled:bg-[#767676]",
    "disabled:hover:scale-100",
    "disabled:hover:shadow-none",
    "disabled:drop-shadow-none"
  );
}

form.addEventListener("submit", onLogin);
