import { viewListings } from "../ui/listing/viewListings";

/**
 * This updates the pagination controls for the list of listings, including "Prev" and "Next" buttons,
 * based on the current page, limit, and optionally a query or tag filter.
 * It dynamically enables or disables the buttons and handles navigation between pages.
 * @param {number} limit The maximum number of listings per page.
 * @param {number} page The current page number.
 * @param {string} [query=""] Optional search query to filter listings.
 * @param {string} [tag=""] Optional tag to filter listings.
 * @example
 * updatePagination(9, 2, "furniture", "vintage");
 */
export function updatePagination(limit, page, query = "", tag = "") {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  const listingsCount =
    document.getElementById("list-container").childElementCount;

  const prevBtn = document.createElement("button");
  prevBtn.classList.add(
    "disabled:border",
    "disabled:border-[#0000006d]",
    "disabled:bg-transparent",
    "disabled:text-[#0000006d]",
    "disabled:hover:scale-100",
    "disabled:hover:shadow-none",
    "bg-secondary",
    "text-white",
    "rounded-3xl",
    "w-[73px]",
    "h-[43px]",
    "hover",
    "hover:shadow-spread"
  );
  prevBtn.textContent = "Prev";
  prevBtn.addEventListener("click", () => {
    if (page > 1) {
      viewListings(limit, page - 1, query, tag);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });

  if (page <= 1) {
    prevBtn.disabled = true;
  }
  pagination.append(prevBtn);

  const pageText = document.createElement("p");
  pageText.textContent = page;

  const nextBtn = document.createElement("button");
  nextBtn.classList.add(
    "disabled:border",
    "disabled:border-[#0000006d]",
    "disabled:bg-transparent",
    "disabled:text-[#0000006d]",
    "disabled:hover:scale-100",
    "disabled:hover:shadow-none",
    "bg-secondary",
    "text-white",
    "rounded-3xl",
    "w-[73px]",
    "h-[43px]",
    "hover",
    "hover:shadow-spread"
  );
  nextBtn.textContent = "Next";
  nextBtn.addEventListener("click", () => {
    if (listingsCount === limit) {
      viewListings(limit, page + 1, query, tag);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });

  if (listingsCount < limit) {
    nextBtn.disabled = true;
  }
  pagination.append(page, nextBtn);
}
