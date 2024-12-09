import { deleteListing } from "../../api/listing/delete";
import { activeListingId } from "../../utilities/activeListingId";
import { displayMessage } from "../../utilities/displayMessage";

/**
 * This function will handle the delete listing event when triggered by the delete button.
 * If successful, it displays a success message and redirects to the home page after a short delay.
 * @param {Event} event deletes listing on button click.
 */
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
    deleteListing(listingId);
    displayMessage(
      "message",
      `Listing with id ${listingId} deleted successfully! Redirecting..`,
      true
    );
    setTimeout(() => {
      window.location.href = "/";
    }, 1100);
  } catch (error) {
    displayMessage("message", error.message);
  }
}
