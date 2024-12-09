import { API_AUCTION_LISTINGS } from "../constants";
import { headers } from "../headers";

/**
 * This function will delete a listing by its ID.
 * @param {number} id the id of the listing.
 * @returns {boolean} returns "true" if the listing is deleted successfully.
 */
export async function deleteListing(id) {
  const response = await fetch(`${API_AUCTION_LISTINGS}/${id}`, {
    method: "delete",
    headers: headers(),
  });

  if (response.ok) {
    return await response.json();
  }

  throw new Error("Could not delete post with id: " + id);
}
