import { getListing } from "../../api/listing/read";
import { activeListingId } from "../../utilities/activeListingId";

export async function viewListing() {
  const listingId = activeListingId();

  try {
    const listing = await getListing(listingId);

    /* const galleryContainer = document.getElementById("image-gallery"); */
    const listingContainer = document.getElementById("listing-container");

    const title = document.createElement("h2");
    title.textContent = listing.title;

    const listingInfo = document.getElementById("listing-info");

    const seller = document.createElement("p");
    seller.textContent = listing._seller.name;

    listingInfo.append(seller);
    listingContainer.append(title);

    return listingContainer;
  } catch (error) {
    //Temporary error alert
    alert(error.message);
  }
}
