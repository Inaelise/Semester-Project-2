/**
 * This will get and parses the logged-in user's data from local storage.
 * If the data is found and valid, it returns the user object; otherwise, it returns `null`.
 *
 * @returns {Object|null} The user object if available, or `null` if no user is found or data is invalid.
 */
export function activeUser() {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    return user;
  } catch (error) {
    return null;
  }
}
