import { updateListing } from "../../api/listing/update";
import { activeListingId } from "../../utilities/activeListingId";

export async function onUpdateListing(e) {
  e.preventDefault();

  const listingId = activeListingId();

  const editForm = e.target;
  const formData = new FormData(editForm);
  const data = Object.fromEntries(formData.entries());

  data.media = [{ url: data.url, alt: "" }];
  delete data.url;

  data.tags = data.tags.split(",").map((tag) => tag.trim());

  try {
    await updateListing(listingId, data);
    window.location.href = `/listing/?id=${listingId}`;
  } catch (error) {
    //Temporary error alert
    alert("Error updating listing: " + error.message);
  }
}
