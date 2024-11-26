import { getListings } from "../../api/listing/read";
import { createCountdown } from "../../utilities/countdown";
import { updatePagination } from "../../utilities/pagination";

export async function viewListings(limit = 9, page = 1) {
  const loader = document.getElementById("loader");

  try {
    //Show loader
    loader.classList.remove("hidden");

    const listings = await getListings(limit, page);

    const ul = document.getElementById("list-container");
    ul.innerHTML = "";

    listings.forEach((item) => {
      const listItem = document.createElement("li");

      const link = document.createElement("a");
      link.href = `/listing/?id=${item.id}`;

      const itemContainer = document.createElement("div");

      const title = document.createElement("h2");
      title.textContent = item.title;

      const img = document.createElement("img");
      if (item.media.length > 0) {
        const selectedImg = item.media[0];
        img.src = selectedImg.url;
        img.alt = selectedImg.alt || "Post image";
      } else {
        img.src = item.media.url;
        img.alt = item.media.alt || "Post image";
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
        item.bids.length > 0
          ? Math.max(...item.bids.map((bid) => bid.amount))
          : 0;
      bidDiv.append(bidText, bid);

      itemContainer.append(img, title, expireDiv, bidDiv);
      link.append(itemContainer);

      listItem.append(link);
      ul.append(listItem);
    });

    updatePagination(limit, page);
  } catch (error) {
    //Temporary error alert
    alert(error.message);
  } finally {
    //Hide loader
    loader.classList.add("hidden");
  }
}
