import { login } from "../../api/auth/login";

export async function onLogin(e) {
  e.preventDefault();

  const loginForm = e.target;
  const formData = new FormData(loginForm);
  const data = Object.fromEntries(formData.entries());

  try {
    await login(data);
    // Temporary alert
    alert("You're logged in");
    window.location.href = "/";
  } catch (error) {
    // Temporary error alert
    alert(error);
  }
}
