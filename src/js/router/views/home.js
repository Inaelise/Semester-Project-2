import { viewListings } from "../../ui/listing/viewListings";
import { displayCredits } from "../../ui/profile/viewCredits";
import { activeUser } from "../../utilities/activeUser";

const user = activeUser();

const container = document.getElementById("credit-container");

const createBtn = document.getElementById("create-link");

const searchInput = document.getElementById("search");

searchInput.addEventListener("input", (event) => {
  const query = event.target.value.trim();
  if (query.length >= 3 || query.length === 0) {
    viewListings(9, 1, query);
  }
});

if (!user) {
  container.classList.add("hidden");
  createBtn.classList.add("hidden");
}

displayCredits();
viewListings();
