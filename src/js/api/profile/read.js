import { API_AUCTION_PROFILES } from "../constants";
import { headers } from "../headers";

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
