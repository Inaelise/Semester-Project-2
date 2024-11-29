import { getListing } from "../../api/listing/read";
import { activeListingId } from "../../utilities/activeListingId";
import { activeUser } from "../../utilities/activeUser";
import { createCountdown } from "../../utilities/countdown";
import { displayMessage } from "../../utilities/displayMessage";

export async function viewListing() {
  const listingId = activeListingId();
  const user = activeUser();
  const loader = document.getElementById("loader");

  // Return to home if there's no id
  if (!activeListingId) {
    window.location.href = "/";
  }

  try {
    // Show loader
    loader.classList.remove("hidden");

    const listing = await getListing(listingId);

    const listingContainer = document.getElementById("listing-container");

    const title = document.createElement("h2");
    title.textContent = listing.title;
    listingContainer.insertBefore(title, listingContainer.firstChild);

    const gallery = document.getElementById("image-gallery");
    const imgContainer = document.createElement("div");
    const mainImg = document.createElement("img");
    // Make the actual gallery
    if (listing.media.length > 0) {
      const firstImg = listing.media[0];
      mainImg.src = firstImg.url;
      mainImg.alt = firstImg.alt || "Post image";
      imgContainer.append(mainImg);
    } else {
      mainImg.src = "/images/default-img.png";
      mainImg.src = "Default image";
      imgContainer.append(mainImg);
    }
    gallery.append(imgContainer);

    const thumbnailsContainer = document.createElement("div");

    if (listing.media.length > 0) {
      listing.media.forEach((mediaItem, index) => {
        if (index > 0) {
          const thumbnail = document.createElement("img");
          thumbnail.src = mediaItem.url;
          thumbnail.alt = mediaItem.alt || "Thumbnail image";

          thumbnail.addEventListener("click", () => {
            if (mainImg.src !== thumbnail.src) {
              // Swap the main image with the clicked thumbnail
              const currentMainSrc = mainImg.src;
              const currentMainAlt = mainImg.alt;

              // Set the clicked thumbnail as the new main image
              mainImg.src = thumbnail.src;
              mainImg.alt = thumbnail.alt;

              // Set the previous main image as a thumbnail
              thumbnail.src = currentMainSrc;
              thumbnail.alt = currentMainAlt;
            }
          });
          thumbnailsContainer.append(thumbnail);
        }
      });
    }

    gallery.append(thumbnailsContainer);

    const listingInfo = document.getElementById("listing-info");
    const form = document.getElementById("make-bid");
    const divOne = document.createElement("div");

    const seller = document.createElement("p");
    seller.textContent = listing.seller.name;

    if (user === listing.seller.name) {
      const editLink = document.createElement("a");
      editLink.href = `/listing/edit/?id=${listingId}`;
      editLink.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
      divOne.append(editLink);
    }
    divOne.append(seller);

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
    const endTimeText = document.createElement("p");
    endTimeText.textContent = "Ends in";
    endTimeContainer.append(endTimeText);

    const description = document.createElement("p");
    description.textContent = listing.description;

    const tags = document.createElement("p");
    tags.textContent = listing.tags.join(", ");

    const bidHistoryContainer = document.createElement("div");
    const bidsTitle = document.createElement("h3");
    bidsTitle.textContent = "Bid history";
    bidHistoryContainer.append(bidsTitle);

    if (listing.bids.length > 0) {
      const sortedBids = [...listing.bids].sort((a, b) => b.amount - a.amount);
      sortedBids.forEach((bid) => {
        const bidContainer = document.createElement("div");

        const bidderInfo = document.createElement("div");
        const bidderAvatar = document.createElement("img");
        bidderAvatar.src = bid.bidder.avatar.url;

        const bidderName = document.createElement("p");
        bidderName.textContent = bid.bidder.name;

        bidderInfo.append(bidderAvatar, bidderName);

        const bidAmountDiv = document.createElement("div");
        const bidAmount = document.createElement("p");
        bidAmount.textContent = bid.amount;

        const creditIcon = document.createElement("span");
        creditIcon.innerHTML = `<i class="fa-solid fa-coins"></i>`;

        bidAmountDiv.append(bidAmount, creditIcon);

        bidContainer.append(bidderInfo, bidAmountDiv);
        bidHistoryContainer.append(bidContainer);
      });
    } else {
      const noBids = document.createElement("p");
      noBids.textContent = "No bids have been made yet";
      bidHistoryContainer.append(noBids);
    }

    divThree.append(endTimeContainer);
    divTwo.append(highestBidContainer);
    listingInfo.insertBefore(divOne, form);
    listingInfo.insertBefore(divTwo, form);
    listingInfo.insertBefore(divThree, form);
    listingInfo.insertBefore(description, form);
    listingInfo.append(tags, bidHistoryContainer);

    return listingContainer;
  } catch (error) {
    displayMessage("listing-container", error.message);
  } finally {
    // Hide loader
    loader.classList.add("hidden");
  }
}
