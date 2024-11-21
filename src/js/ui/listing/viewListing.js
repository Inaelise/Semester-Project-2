import { getListing } from "../../api/listing/read";
import { activeListingId } from "../../utilities/activeListingId";
import { createCountdown } from "../../utilities/countdown";

export async function viewListing() {
  const listingId = activeListingId();

  try {
    const listing = await getListing(listingId);

    const listingContainer = document.getElementById("listing-container");

    const title = document.createElement("h2");
    title.textContent = listing.title;
    listingContainer.insertBefore(title, listingContainer.firstChild);

    const gallery = document.getElementById("image-gallery");
    const img = document.createElement("img");
    // Make the actual gallery
    if (listing.media.length > 0) {
      const selectedImg = listing.media[0];
      img.src = selectedImg.url;
      img.alt = selectedImg.alt || "Post image";
    } else {
      img.src = listing.media.url;
      img.alt = listing.media.alt || "Post image";
    }
    gallery.append(img);

    const listingInfo = document.getElementById("listing-info");
    const form = document.getElementById("make-bid");
    const divOne = document.createElement("div");

    const seller = document.createElement("p");
    seller.textContent = listing.seller.name;

    const editLink = document.createElement("a");
    editLink.href = `/listing/edit/?id=${listingId}`;
    editLink.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;

    const divTwo = document.createElement("div");

    const highestBidContainer = document.createElement("div");
    const highestBid = document.createElement("p");
    highestBid.textContent =
      listing.bids.length > 0
        ? Math.max(...listing.bids.map((bid) => bid.amount))
        : 0;
    const highestBidText = document.createElement("p");
    highestBidText.textContent = "Highest bid";

    highestBidContainer.append(highestBid, highestBidText);

    const divThree = document.createElement("div");

    const endTimeContainer = document.createElement("div");
    createCountdown(listing.endsAt, endTimeContainer);

    const description = document.createElement("p");
    description.textContent = listing.description;

    const tags = document.createElement("p");
    tags.textContent = listing.tags;

    divThree.append(endTimeContainer);
    divTwo.append(highestBidContainer);
    divOne.append(seller, editLink);
    listingInfo.insertBefore(divOne, form);
    listingInfo.insertBefore(divTwo, form);
    listingInfo.insertBefore(divThree, form);
    listingInfo.insertBefore(description, form);
    listingInfo.append(tags);

    return listingContainer;
  } catch (error) {
    //Temporary error alert
    alert(error.message);
  }
}
