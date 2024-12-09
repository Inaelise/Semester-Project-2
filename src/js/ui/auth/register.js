import { register } from "../../api/auth/register";
import { displayMessage } from "../../utilities/displayMessage";

/**
 * This function will handle the register form submission event.
 * @param {Event} event registers user on submit.
 */
export async function onRegister(e) {
  e.preventDefault();

  const registerForm = e.target;
  const formData = new FormData(registerForm);
  const data = Object.fromEntries(formData.entries());

  try {
    await register(data);
    displayMessage("message", "Registered successfully! Redirecting..", true);
    form.reset();
    setTimeout(() => {
      window.location.href("/auth/login/");
    }, 1000);
  } catch (error) {
    displayMessage("message", error.message);
  }
}
