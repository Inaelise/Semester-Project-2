/**
 * This will check if the user is logged in by looking for a token in local storage.
 * If no token is found, it displays an alert and redirects the user to the login page.
 */
export function authGuard() {
  if (!localStorage.token) {
    alert("You must be logged in to view this page");
    window.location.href = "/auth/login/";
  }
}
