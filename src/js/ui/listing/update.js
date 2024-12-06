import { updateListing } from "../../api/listing/update";
import { activeListingId } from "../../utilities/activeListingId";
import { displayMessage } from "../../utilities/displayMessage";

export async function onUpdateListing(e) {
  e.preventDefault();

  const listingId = activeListingId();

  const editForm = e.target;
  const formData = new FormData(editForm);
  const data = Object.fromEntries(formData.entries());

  const images = Array.from(
    document.querySelectorAll("#edit-img input[name='images[]']")
  ).map((img) => ({ url: img.value, alt: "" }));

  data.media = images;
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
    }, 1000);
  } catch (error) {
    displayMessage("message", error.message);
  }
}
