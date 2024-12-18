import { API_AUCTION_PROFILES } from "../constants";
import { headers } from "../headers";

/**
 * This function will update the profile in the API of the logged in user.
 * @param {string} username this is the user's name.
 * @param {object} avatar this is the avatar object for the user profile.
 * @param {string} bio this is the bio of the user profile.
 * @returns {object} the updated profile data is returned.
 */
export async function updateProfile(username, { name, avatar, bio }) {
  const response = await fetch(`${API_AUCTION_PROFILES}/${username}`, {
    headers: headers("application/json"),
    method: "put",
    body: JSON.stringify({ name, avatar, bio }),
  });

  if (response.ok) {
    const { data } = await response.json();
    return data;
  }
  throw new Error(`Could not update profile with username: ${username}`);
}
