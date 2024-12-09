import { API_AUCTION_LISTINGS } from "../constants";
import { headers } from "../headers";

/**
 * This function will create a new listing by sending a POST request to the API.
 * @param {Object} listingData The data for the new listing.
 * @param {string} listingData.title This is the title of the listing.
 * @param {string} listingData.description This is the description of the listing.
 * @param {Array<string>} listingData.tags This is an array of tags for the listing.
 * @param {Object} listingData.media This is the media object for the listing.
 * @param {string} listingData.media.url This is the URL of the media for the listing.
 * @param {string} listingData.media.alt This is the alt text of the media for the listing.
 * @param {string} listingData.endsAt This is the end date and time of the listing.
 * @returns {Object} The data for the created listing is returned.
 * @example
 * const newListing = {
 *  title: "My listing"
 *  description: "This is a new listing",
 *  tags: ["new", "art"],
 *  media: { url:"https://example.com/image.jpg", alt: "An example image" },
 *  endsAt: "2020-01-01T00:00:00.000Z"
 * };
 */
export async function createListing({
  title,
  description,
  tags,
  media,
  endsAt,
}) {
  const response = await fetch(API_AUCTION_LISTINGS, {
    headers: headers("application/json"),
    method: "post",
    body: JSON.stringify({ title, description, tags, media, endsAt }),
  });

  const result = await response.json();

  if (response.ok) {
    const { data } = result;
    return data;
  }
  const errorMessage = result.errors.map((error) => error.message).join("\r\n");

  throw new Error(errorMessage);
}
