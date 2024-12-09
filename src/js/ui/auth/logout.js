import { remove } from "../../storage/remove";

/**
 * This function will remove the access token and user data in local storage.
 * It is a helper function for the function onLogout().
 *  @example
 * // Call the logout function to remove the data:
 * logout();
 */
export function logout() {
  remove("token");
  remove("user");
}
