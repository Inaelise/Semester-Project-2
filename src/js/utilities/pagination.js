import { viewListings } from "../ui/listing/viewListings";

export function updatePagination(limit, page) {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  if (page > 1) {
    const prevBtn = document.createElement("button");
    prevBtn.textContent = "Prev";
    prevBtn.addEventListener("click", () => {
      viewListings(limit, page - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    pagination.append(prevBtn);
  }

  const pageText = document.createElement("p");
  pageText.textContent = page;

  const nextBtn = document.createElement("button");
  nextBtn.textContent = "Next";
  nextBtn.addEventListener("click", () => {
    viewListings(limit, page + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  pagination.append(page, nextBtn);
}
