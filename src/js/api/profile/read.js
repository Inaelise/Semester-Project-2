import { API_AUCTION_PROFILES } from "../constants";
import { headers } from "../headers";

/**
 * This function will fetch profile data from the API by username.
 * @param {string} username the username of the profile.
 * @returns {object} the profile data of the specified user. Throws an error if unsuccessful.
 */
export async function getProfile(username) {
  const response = await fetch(`${API_AUCTION_PROFILES}/${username}`, {
    headers: headers(),
  });

  const result = await response.json();

  if (response.ok) {
    const { data } = result;
    return data;
  }
  const error = result.errors.map((error) => error.message).join("\r\n");

  throw new Error(error);
}
