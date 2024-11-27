import { viewListings } from "../../ui/listing/viewListings";
import { displayCredits } from "../../ui/profile/viewCredits";

const searchInput = document.getElementById("search");

searchInput.addEventListener("input", (event) => {
  const query = event.target.value.trim();
  if (query.length >= 3 || query.length === 0) {
    viewListings(9, 1, query);
  }
});

displayCredits();
viewListings();
