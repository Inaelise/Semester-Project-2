import { register } from "../../api/auth/register";
import { displayMessage } from "../../utilities/displayMessage";

export async function onRegister(e) {
  e.preventDefault();

  const registerForm = e.target;
  const formData = new FormData(registerForm);
  const data = Object.fromEntries(formData.entries());

  try {
    await register(data);
    //Temporary alert
    alert("Thank you for registering");
    /* window.location.href = "/auth/login/"; */
  } catch (error) {
    displayMessage("message", error.message);
  }
}
