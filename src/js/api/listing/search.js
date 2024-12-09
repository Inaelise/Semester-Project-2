import { API_AUCTION_LISTINGS } from "../constants";
import { headers } from "../headers";

/**
 * This will search for listings based on a query, with optional pagination parameters.
 * If successful, it returns the matching listings data.
 * @param {string} query The search query to find listings.
 * @param {number} [limit=9] The maximum number of results per page (default is 9).
 * @param {number} [page=1] The page number for paginated results (default is 1).
 * @returns {Promise<Object>} The matching listings data.
 * @example
 * const listings = await searchListings("furniture", 9, 1);
 * console.log(listings);
 */
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
