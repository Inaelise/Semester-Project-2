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
    title.classList.add("place-self-start", "font-medium", "text-largeMed");
    title.textContent = listing.title;

    const tags = document.createElement("p");
    tags.classList.add("text-small", "text-[#000000c8]");
    tags.textContent = listing.tags.join(", ");

    const gallery = document.getElementById("image-gallery");
    const imgContainer = document.createElement("div");
    const mainImg = document.createElement("img");
    mainImg.classList.add(
      "w-[280px]",
      "h-[250px]",
      "object-cover",
      "sm:w-[465px]",
      "sm:h-[350px]"
    );
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
    gallery.append(title, imgContainer);

    const thumbnailsContainer = document.createElement("div");
    thumbnailsContainer.classList.add("flex", "flex-row", "gap-[12px]");

    if (listing.media.length > 0) {
      listing.media.forEach((mediaItem, index) => {
        if (index > 0) {
          const thumbnail = document.createElement("img");
          thumbnail.classList.add(
            "w-[66px]",
            "h-[59px]",
            "object-cover",
            "sm:w-[86px]",
            "sm:h-[79px]"
          );
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

    gallery.append(thumbnailsContainer, tags);

    const listingInfo = document.getElementById("listing-info");
    const form = document.getElementById("make-bid");
    const divOne = document.createElement("div");
    divOne.classList.add(
      "flex",
      "flex-row-reverse",
      "justify-between",
      "items-center"
    );

    const seller = document.createElement("p");
    seller.classList.add("font-medium");
    seller.textContent = listing.seller.name;

    if (user === listing.seller.name) {
      const editLink = document.createElement("a");
      editLink.href = `/listing/edit/?id=${listingId}`;
      editLink.innerHTML = `<i class="hover fa-solid fa-pen-to-square fa-lg"></i>`;
      divOne.append(editLink);
    }
    divOne.append(seller);

    const divContainer = document.createElement("div");
    divContainer.classList.add(
      "bg-main",
      "rounded-xl",
      "flex",
      "justify-between",
      "py-2",
      "px-3",
      "text-white",
      "w-full"
    );

    const divTwo = document.createElement("div");

    const highestBidContainer = document.createElement("div");
    const currentBidContainer = document.createElement("div");
    currentBidContainer.classList.add("flex", "gap-2", "items-center");

    const bidIcon = document.createElement("span");
    bidIcon.innerHTML = `<i class="fa-solid fa-coins fa-xs"></i>`;

    const highestBid = document.createElement("p");
    highestBid.classList.add("font-semibold", "text-medium");
    highestBid.textContent =
      listing.bids.length > 0
        ? Math.max(...listing.bids.map((bid) => bid.amount))
        : 0;
    const highestBidText = document.createElement("p");
    highestBidText.classList.add("font-light", "text-[#ffffff9b]");
    highestBidText.textContent = "Highest bid";
    currentBidContainer.append(bidIcon, highestBid);
    highestBidContainer.append(currentBidContainer, highestBidText);

    const divThree = document.createElement("div");

    const endTimeContainer = document.createElement("div");
    endTimeContainer.classList.add("font-semibold", "text-medium");
    createCountdown(listing.endsAt, endTimeContainer);
    const endTimeText = document.createElement("p");
    endTimeText.classList.add("font-light", "text-base", "text-[#ffffff9b]");
    endTimeText.textContent = "Ends in";
    endTimeContainer.append(endTimeText);

    divContainer.append(divTwo, divThree);

    const description = document.createElement("p");
    description.classList.add("text-center", "py-6", "lg:text-left");
    description.textContent = listing.description;

    const bidSection = document.getElementById("bid-history");
    const bidHistoryContainer = document.createElement("div");
    bidHistoryContainer.classList.add(
      "flex",
      "flex-col",
      "items-center",
      "m-auto",
      "px-3",
      "divide-y",
      "divide-slate-300",
      "max-w-[655px]"
    );
    const bidsTitle = document.createElement("h3");
    bidsTitle.classList.add(
      "font-medium",
      "text-medium",
      "text-center",
      "w-full",
      "pb-3"
    );
    bidsTitle.textContent = "Bid history";
    bidHistoryContainer.append(bidsTitle);

    if (listing.bids.length > 0) {
      const sortedBids = [...listing.bids].sort((a, b) => b.amount - a.amount);
      sortedBids.forEach((bid) => {
        const bidContainer = document.createElement("div");
        bidContainer.classList.add("flex", "w-full", "justify-between", "py-4");

        const bidderInfo = document.createElement("div");
        bidderInfo.classList.add("flex", "gap-2", "items-center");
        const bidderAvatar = document.createElement("img");
        bidderAvatar.classList.add(
          "w-[43px]",
          "h-[43px]",
          "object-cover",
          "rounded-full"
        );
        bidderAvatar.src = bid.bidder.avatar.url;

        const bidderName = document.createElement("p");
        bidderName.classList.add("font-medium", "text-small");
        bidderName.textContent = bid.bidder.name;

        bidderInfo.append(bidderAvatar, bidderName);

        const bidAmountDiv = document.createElement("div");
        bidAmountDiv.classList.add("flex", "gap-2", "items-center");
        const bidAmount = document.createElement("p");
        bidAmount.classList.add("font-semibold");
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
    listingInfo.insertBefore(divContainer, form);
    listingInfo.insertBefore(description, form);

    bidSection.append(bidHistoryContainer);

    return listingContainer, bidSection;
  } catch (error) {
    displayMessage("listing-container", error.message);
  } finally {
    // Hide loader
    loader.classList.add("hidden");
  }
}
