import { API_AUCTION_PROFILES } from "../constants";
import { headers } from "../headers";

/**
 * This will retrieve the credits of a user by username.
 * If successful, it returns the user's credit data.
 * @param {string} username The username of the user to retrieve credits for.
 * @returns {Promise<Object>} The credit balance data for the specified user.
 * @example
 * const credits = await getCredits("Ola_Normann");
 * console.log(credits);
 */
export async function getCredits(username) {
  const response = await fetch(`${API_AUCTION_PROFILES}/${username}/credits`, {
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
