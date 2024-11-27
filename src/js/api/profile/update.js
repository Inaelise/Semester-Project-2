import { API_AUCTION_PROFILES } from "../constants";
import { headers } from "../headers";

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
