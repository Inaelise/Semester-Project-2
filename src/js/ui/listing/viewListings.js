import { getListings } from "../../api/listing/read";
import { searchListings } from "../../api/listing/search";
import { createCountdown } from "../../utilities/countdown";
import { displayMessage } from "../../utilities/displayMessage";
import { updatePagination } from "../../utilities/pagination";

export async function viewListings(limit = 9, page = 1, query = "") {
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
    } else {
      listings = await getListings(limit, page);
    }

    // Clear the current list
    ul.innerHTML = "";

    // If no listings found
    if (!Array.isArray(listings) || listings.length === 0) {
      ul.innerHTML = "<p>No listings found.</p>";
      return;
    }

    // Render listings
    listings.forEach((item) => {
      const listItem = document.createElement("li");

      const link = document.createElement("a");
      link.href = `/listing/?id=${item.id}`;

      const itemContainer = document.createElement("div");

      const title = document.createElement("h2");
      title.textContent = item.title || "No title available";

      const img = document.createElement("img");
      if (item.media?.length > 0) {
        const selectedImg = item.media[0];
        img.src = selectedImg.url || "/images/default-img.png";
        img.alt = selectedImg.alt || "Post image";
      } else {
        img.src = "/images/default-img.png"; // Default image
        img.alt = "Post image";
      }

      const expireDiv = document.createElement("div");
      const expireText = document.createElement("p");
      expireText.textContent = "Expires";
      expireDiv.append(expireText);
      createCountdown(item.endsAt, expireDiv);

      const bidDiv = document.createElement("div");
      const bidText = document.createElement("p");
      bidText.textContent = "Highest bid";
      const bid = document.createElement("p");
      bid.textContent =
        item.bids?.length > 0
          ? Math.max(...item.bids.map((bid) => bid.amount))
          : 0;
      bidDiv.append(bidText, bid);

      itemContainer.append(img, title, expireDiv, bidDiv);
      link.append(itemContainer);

      listItem.append(link);
      ul.append(listItem);
    });

    updatePagination(limit, page, query);
    // Show pagination
    pagination.classList.remove("hidden");
  } catch (error) {
    displayMessage("list-container", error.message);
  } finally {
    // Hide loader
    loader.classList.add("hidden");
  }
}
