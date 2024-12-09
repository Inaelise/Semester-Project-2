import { logout } from "../auth/logout";

/**
 * This will logout the user when the button is clicked.
 * If confirmed, the user will logout. A message will be displayed and the user will be redirected to the home page.
 * @example
 * // Call this function to set up the logout listener:
 * onLogout();
 */
export function onLogout() {
  const logoutBtns = document.querySelectorAll(".logout-btn");

  logoutBtns.forEach((btns) => {
    btns.addEventListener("click", () => {
      if (window.confirm("Are you sure you want to logout?") === true) {
        logout();
        window.location.href = "/";
      }
    });
  });
}
