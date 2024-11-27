import { login } from "../../api/auth/login";
import { displayMessage } from "../../utilities/displayMessage";

export async function onLogin(e) {
  e.preventDefault();

  const loginForm = e.target;
  const formData = new FormData(loginForm);
  const data = Object.fromEntries(formData.entries());

  try {
    await login(data);
    displayMessage("message", "Login successful! Redirecting..");
    setTimeout(() => {
      window.location.href = "/";
    }, 1300);
  } catch (error) {
    displayMessage("message", error.message);
  }
}
