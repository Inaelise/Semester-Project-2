import { API_AUCTION_LISTINGS } from "../constants";
import { headers } from "../headers";

export async function searchListings(query, limit = 9, page = 1) {
  const response = await fetch(
    `${API_AUCTION_LISTINGS}/search?q=${query}&limit=${limit}&page=${page}`,
    {
      headers: headers(),
    }
  );

  const result = await response.json();

  if (response.ok) {
    const { data } = result;
    return data;
  }
  const error = result.errors.map((error) => error.message).join("\r\n");

  throw new Error(error);
}
