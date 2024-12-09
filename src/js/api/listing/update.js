import { API_AUCTION_LISTINGS } from "../constants";
import { headers } from "../headers";

/**
 * This function will update a listing with specific id in the API.
 * @param {number} id This is the id of the listing.
 * @param {Object} listingData the data to update the listing with.
 * @param {string} listingData.title This is the title of the listing.
 * @param {string} listingData.description This is the description of the listing.
 * @param {Array<string>} listingData.tags This is an array of tags for the listing.
 * @param {Object} listingData.media This is the media object for the listing.
 * @param {string} listingData.media.url This is the URL of the media for the listing.
 * @param {string} listingData.media.alt This is the alt text of the media for the listing.
 * @returns {Object} The updated listing data is returned.
 */
export async function updateListing(id, { title, description, tags, media }) {
  const response = await fetch(`${API_AUCTION_LISTINGS}/${id}`, {
    headers: headers("application/json"),
    method: "put",
    body: JSON.stringify({ title, description, tags, media }),
  });

  const result = await response.json();

  if (response.ok) {
    const { data } = result;
    return data;
  }

  const errorMessage = result.errors.map((error) => error.message).join("\r\n");

  throw new Error(errorMessage);
}
