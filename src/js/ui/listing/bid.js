import { makeBid } from "../../api/listing/bid";
import { displayMessage } from "../../utilities/displayMessage";
import { activeListingId } from "../../utilities/activeListingId";

/**
 * This will handle the bid form submission for making a bid on a listing.
 * If successful, it displays a success message and reloads the page after a short delay.
 * @param {Event} e The form submission event.
 * @example
 * document.querySelector("#bidForm").addEventListener("submit", onBid);
 */
export async function onBid(e) {
  e.preventDefault();

  const listingId = activeListingId();

  const bidForm = e.target;
  const formData = new FormData(bidForm);
  const data = Object.fromEntries(formData.entries());

  data.amount = parseInt(data.amount);

  try {
    await makeBid(listingId, data);
    displayMessage("message", "Bid made successfully!", true);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  } catch (error) {
    displayMessage("message", error.message);
  }
}
