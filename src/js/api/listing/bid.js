import { API_AUCTION_LISTINGS } from "../constants";
import { headers } from "../headers";

/**
 * This will place a bid on a listing by sending the bid amount to the API.
 * Retries the request up to "maxRetries" times if it fails due to network or server issues.
 * Shows a custom error message for network failures.
 * If successful, it returns the updated bid data.
 * @param {string} id The ID of the listing.
 * @param {Object} bid This is the bid parameters.
 * @param {number} bid.amount The bid amount to be placed.
 * @param {number} [maxRetries=3] The maximum number of retry attempts for failed requests.
 * @returns {Promise<Object>} The updated bid data.
 * @throws {Error} If all retry attempts fail or the server responds with an error.
 * @example
 * try {
 *   const result = await makeBid("listing123", { amount: 100 });
 *   console.log("Bid placed:", result);
 * } catch (error) {
 *   console.error("Bid failed:", error.message);
 * }
 */
export async function makeBid(id, { amount }, maxRetries = 3) {
  let attempt = 0;

  while (attempt < maxRetries) {
    try {
      const response = await fetch(`${API_AUCTION_LISTINGS}/${id}/bids`, {
        headers: headers("application/json"),
        method: "post",
        body: JSON.stringify({ amount }),
      });

      const result = await response.json();

      if (response.ok) {
        return result.data;
      }

      const errorMessage = result.errors
        .map((error) => error.message)
        .join("\r\n");
      throw new Error(errorMessage);
    } catch (error) {
      attempt++;

      const isLastAttempt = attempt === maxRetries;

      // Specific handling for network errors
      const isNetworkError = error.message.includes("Failed to fetch");

      if (isLastAttempt) {
        const friendlyMessage = isNetworkError
          ? "Network error: Please check your connection and try again."
          : error.message;
        throw new Error(friendlyMessage);
      }
      const delay = Math.pow(2, attempt) * 100;
      await new Promise((res) => setTimeout(res, delay));
    }
  }
}
