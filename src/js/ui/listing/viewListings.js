import { filterTags } from "../../api/listing/filter";
import { getListings } from "../../api/listing/read";
import { searchListings } from "../../api/listing/search";
import { createCountdown } from "../../utilities/countdown";
import { displayMessage } from "../../utilities/displayMessage";
import { updatePagination } from "../../utilities/pagination";

/**
 * This function will display the list of listings on the home page.
 * @returns the unordered list of listings.
 */
export async function viewListings(limit = 9, page = 1, query = "", tag = "") {
  const loader = document.getElementById("loader");
  const ul = document.getElementById("list-container");
  const pagination = document.getElementById("pagination");

  try {
    // Show loader
    loader.classList.remove("hidden");
    // Hide pagination
    pagination.classList.add("hidden");

    let listings;

    if (query) {
      listings = await searchListings(query, limit, page);
    } else if (tag) {
      listings = await filterTags(tag, limit, page);
    } else {
      listings = await getListings(limit, page);
    }

    // Clear the current list
    ul.innerHTML = "";

    // If no listings found
    if (!Array.isArray(listings) || listings.length === 0) {
      ul.innerHTML =
        "<div class='bg-alt h-[100px] px-[60px] text-center drop-shadow-input flex flex-col items-center justify-center gap-4 md:mt-[20px] md:mb-[60px]'><i class='fa-solid fa-circle-exclamation fa-xl md:fa-2xl text-[#0000005b] drop-shadow-filterBtns'></i><p class='text-[#00000088]'>No listings found.</p></div>";
      return;
    }

    // Render listings
    listings.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.classList.add("w-[245px]", "hover", "hover:shadow-none");
      listItem.title = "Go to listing";

      const link = document.createElement("a");
      link.href = `/listing/?id=${item.id}`;

      const itemContainer = document.createElement("div");

      const title = document.createElement("h2");
      title.classList.add("font-medium", "pt-1", "pb-2", "truncate");
      title.textContent = item.title || "No title available";

      const img = document.createElement("img");
      img.classList.add("w-full", "h-[281px]", "object-cover");
      if (item.media?.length > 0) {
        const selectedImg = item.media[0];
        img.src = selectedImg.url || "/images/default-img.png";
        img.alt = selectedImg.alt || "Post image";
      } else {
        img.src = "/images/default-img.png"; // Default image
        img.alt = "Post image";
      }

      const expireDiv = document.createElement("div");
      expireDiv.classList.add("pb-3");
      const expireText = document.createElement("p");
      expireText.classList.add("opacity-50");
      expireText.textContent = "Expires";
      expireDiv.append(expireText);
      createCountdown(item.endsAt, expireDiv);

      const bidDiv = document.createElement("div");
      const bidText = document.createElement("p");
      bidText.classList.add("opacity-50");
      bidText.textContent = "Highest bid";
      const bidContainer = document.createElement("div");
      bidContainer.classList.add("flex", "items-center", "gap-2");
      const bid = document.createElement("p");
      bid.classList.add("text-medium");
      bid.textContent =
        item.bids?.length > 0
          ? Math.max(...item.bids.map((bid) => bid.amount))
          : 0;
      const creditIcon = document.createElement("span");
      creditIcon.innerHTML = `<i class="fa-solid fa-coins fa-sm"></i>`;
      bidContainer.append(bid, creditIcon);
      bidDiv.append(bidText, bidContainer);

      itemContainer.append(img, title, expireDiv, bidDiv);
      link.append(itemContainer);

      listItem.append(link);
      ul.append(listItem);
    });

    updatePagination(limit, page, query, tag);
    // Show pagination
    pagination.classList.remove("hidden");
  } catch (error) {
    displayMessage("list-container", error.message);
  } finally {
    // Hide loader
    loader.classList.add("hidden");
  }
}
