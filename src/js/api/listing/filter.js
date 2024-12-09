import { API_AUCTION_LISTINGS } from "../constants";
import { headers } from "../headers";

/**
 * This will filter listings by a specific tag, with optional pagination parameters.
 * If successful, it returns the filtered listings data.
 * @param {string} tag The tag to filter listings by.
 * @param {number} [limit=9] The maximum number of results per page (default is 9).
 * @param {number} [page=1] The page number for paginated results (default is 1).
 * @returns {Promise<Object>} The filtered listings data.
 * @example
 * const listings = await filterTags("art", 9, 1);
 * console.log(listings);
 */
export async function filterTags(tag, limit = 9, page = 1) {
  const response = await fetch(
    `${API_AUCTION_LISTINGS}?_tag=${tag}&limit=${limit}&page=${page}&_active=true`,
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
