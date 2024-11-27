import { deleteListing } from "../../api/listing/delete";
import { activeListingId } from "../../utilities/activeListingId";
import { displayMessage } from "../../utilities/displayMessage";

export async function onDelete(e) {
  e.preventDefault();

  const listingId = activeListingId();

  const confirmDelete = confirm(
    "Are you sure you want to delete this listing?"
  );
  if (!confirmDelete) {
    return;
  }

  try {
    await deleteListing(listingId);
    displayMessage(
      "message",
      `Listing with id ${listingId} deleted successfully! Redirecting..`
    );
    setTimeout(() => {
      window.location.href = "/";
    }, 3000);
  } catch (error) {
    displayMessage("message", error.message);
  }
}
