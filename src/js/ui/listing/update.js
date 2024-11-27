import { updateListing } from "../../api/listing/update";
import { activeListingId } from "../../utilities/activeListingId";
import { displayMessage } from "../../utilities/displayMessage";

export async function onUpdateListing(e) {
  e.preventDefault();

  const listingId = activeListingId();

  const editForm = e.target;
  const formData = new FormData(editForm);
  const data = Object.fromEntries(formData.entries());

  data.media = [{ url: data.image, alt: "" }];
  delete data.image;

  data.tags = data.tags.split(",").map((tag) => tag.trim());

  try {
    await updateListing(listingId, data);
    displayMessage(
      "message",
      "Listing updated successfully! Redirecting..",
      true
    );
    setTimeout(() => {
      window.location.href = `/listing/?id=${listingId}`;
    }, 1300);
  } catch (error) {
    displayMessage("message", error.message);
  }
}
