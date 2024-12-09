import { login } from "../../api/auth/login";
import { displayMessage } from "../../utilities/displayMessage";

/**
 * This function will handle the login form submission event.
 * @param {Event} event logs in user on submit.
 */
export async function onLogin(e) {
  e.preventDefault();

  const loginForm = e.target;
  const formData = new FormData(loginForm);
  const data = Object.fromEntries(formData.entries());

  try {
    await login(data);
    displayMessage("message", "Login successful! Redirecting..", true);
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  } catch (error) {
    displayMessage("message", error.message);
  }
}
