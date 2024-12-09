import { API_AUCTION_LISTINGS } from "../constants";
import { headers } from "../headers";

/**
 * This will place a bid on a listing by sending the bid amount to the API.
 * If successful, it returns the updated bid data.
 * @param {string} id The ID of the listing.
 * @param {Object} bid This is the bid parameters.
 * @param {number} bid.amount The bid amount to be placed.
 * @returns {Promise<Object>} The updated bid data.
 * @example
 * const bid = await makeBid("listing123", { amount: 100 });
 * console.log(bid);
 */
export async function makeBid(id, { amount }) {
  const response = await fetch(`${API_AUCTION_LISTINGS}/${id}/bids`, {
    headers: headers("application/json"),
    method: "post",
    body: JSON.stringify({ amount }),
  });

  const result = await response.json();

  if (response.ok) {
    const { data } = result;
    return data;
  }
  const errorMessage = result.errors.map((error) => error.message).join("\r\n");

  throw new Error(errorMessage);
}
