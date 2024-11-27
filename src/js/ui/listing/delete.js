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
    //Temporary alert
    alert(`Listing with id ${listingId} deleted successfully!`);
    window.location.href = "/";
  } catch (error) {
    displayMessage("message", error.message);
  }
}
