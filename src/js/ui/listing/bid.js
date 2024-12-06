import { makeBid } from "../../api/listing/bid";
import { displayMessage } from "../../utilities/displayMessage";
import { activeListingId } from "../../utilities/activeListingId";

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
