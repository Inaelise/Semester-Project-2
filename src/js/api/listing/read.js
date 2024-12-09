import { API_AUCTION_LISTINGS } from "../constants";
import { headers } from "../headers";

/**
 * This function will fetch a listing by its id from the API.
 * @param {number} id the id of the listing that will be fetched.
 * @returns {Object} the listing data.
 */
export async function getListing(id) {
  const response = await fetch(
    `${API_AUCTION_LISTINGS}/${id}?_seller=true&_bids=true`,
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

/**
 * This function will fetch a list of listing from the API.
 * @param {number} limit the maximum number of listings to retrieve. Defaults to 9.
 * @param {number} page the page number to retrieve. Defaults to 1.
 * @returns an array of listing data.
 */
export async function getListings(limit = 9, page = 1) {
  const response = await fetch(
    `${API_AUCTION_LISTINGS}?limit=${limit}&page=${page}&sort=created&_active=true&_seller=true&_bids=true`,
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
