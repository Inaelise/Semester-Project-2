import { logout } from "../auth/logout";

export function onLogout() {
  const logoutBtn = document.getElementById("logout-btn");

  logoutBtn.addEventListener("click", () => {
    if (window.confirm("Are you sure you want to logout?") === true) {
      logout();
      window.location.href = "/auth/login/";
    }
  });
}
