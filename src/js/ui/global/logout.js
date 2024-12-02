import { logout } from "../auth/logout";

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
