import { viewListings } from "../ui/listing/viewListings";

export function updatePagination(limit, page, query = "") {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  const listingsCount =
    document.getElementById("list-container").childElementCount;

  const prevBtn = document.createElement("button");
  prevBtn.textContent = "Prev";
  prevBtn.addEventListener("click", () => {
    if (page > 1) {
      viewListings(limit, page - 1, query);
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
  nextBtn.textContent = "Next";
  nextBtn.addEventListener("click", () => {
    if (listingsCount === limit) {
      viewListings(limit, page + 1, query);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });

  if (listingsCount < limit) {
    nextBtn.disabled = true;
  }
  pagination.append(page, nextBtn);
}
