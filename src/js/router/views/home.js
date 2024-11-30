import { viewListings } from "../../ui/listing/viewListings";
import { displayCredits } from "../../ui/profile/viewCredits";
import { activeUser } from "../../utilities/activeUser";

const user = activeUser();

const container = document.getElementById("credit-container");
const createBtn = document.getElementById("create-link");
const searchInput = document.getElementById("search");

// Handle search input
searchInput.addEventListener("input", (event) => {
  const query = event.target.value.trim();
  if (query.length >= 3 || query.length === 0) {
    viewListings(9, 1, query);
  }
});

// Handle tag filter
let activeTag = "";
const filterImgTag = document.querySelectorAll("ul li img");

filterImgTag.forEach((img) => {
  img.addEventListener("click", (e) => {
    const tag = e.target.getAttribute("data-tag");

    //Reset filter if same tag is clicked
    if (activeTag === tag) {
      activeTag = "";
      viewListings(9, 1);
    } else {
      //Apply tag filter
      activeTag = tag;
      viewListings(9, 1, tag);
    }
  });
});

// Hide credits and create link if no user
if (!user) {
  container.classList.add("hidden");
  createBtn.classList.add("hidden");
}

displayCredits();
viewListings();
