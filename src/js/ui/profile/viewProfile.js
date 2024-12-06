import { getProfile } from "../../api/profile/read";
import { activeUser } from "../../utilities/activeUser";
import { displayMessage } from "../../utilities/displayMessage";
import { closeModal, openModal } from "../../utilities/modal";

export async function viewProfile() {
  const user = activeUser();
  const loader = document.getElementById("loader");
  const closeBtn = document.getElementById("close-modal");
  closeBtn.addEventListener("click", closeModal);

  try {
    // Show loader
    loader.classList.remove("hidden");

    const profile = await getProfile(user);

    document.title = user;

    const profileContainer = document.getElementById("profile-container");

    const creditsDiv = document.createElement("div");
    creditsDiv.classList.add("flex", "gap-2", "py-2");
    const creditsIcon = document.createElement("span");
    creditsIcon.innerHTML = `<i class="fa-solid fa-coins"></i>`;

    const credits = document.createElement("p");
    credits.textContent = profile.credits;

    creditsDiv.append(creditsIcon, credits);

    const img = document.createElement("img");
    img.src = profile.avatar.url;
    img.classList.add(
      "w-[160px]",
      "h-[160px]",
      "rounded-full",
      "object-cover",
      "drop-shadow-input",
      "lg:w-[218px]",
      "lg:h-[218px]"
    );

    const userName = document.createElement("h2");
    userName.textContent = profile.name;
    userName.classList.add("font-medium", "text-medium");

    const bio = document.createElement("p");
    bio.textContent = profile.bio;
    bio.classList.add("pt-4", "pb-14", "font-light", "text-small");

    const countDiv = document.createElement("div");
    countDiv.classList.add("flex", "gap-14");

    const listingCountDiv = document.createElement("div");
    listingCountDiv.classList.add("text-center");
    const listingCountText = document.createElement("p");
    listingCountText.textContent = "Listings";

    const listingCount = document.createElement("p");
    listingCount.textContent = profile._count.listings;
    listingCount.classList.add(
      "font-black",
      "text-largeMed",
      "drop-shadow-text"
    );

    listingCountDiv.append(listingCount, listingCountText);

    const winCountDiv = document.createElement("div");
    winCountDiv.classList.add("text-center");
    const winCountText = document.createElement("p");
    winCountText.textContent = "Wins";

    const winCount = document.createElement("p");
    winCount.textContent = profile._count.wins;
    winCount.classList.add("font-black", "text-largeMed", "drop-shadow-text");

    winCountDiv.append(winCount, winCountText);

    countDiv.append(listingCountDiv, winCountDiv);

    const editBtn = document.createElement("button");
    editBtn.classList.add("my-20", "btn", "hover", "hover:shadow-spread");
    editBtn.textContent = "Edit profile";
    editBtn.id = "edit-btn";
    editBtn.addEventListener("click", openModal);

    profileContainer.append(creditsDiv, img, userName, bio, countDiv, editBtn);

    return profileContainer;
  } catch (error) {
    displayMessage("profile-container", error.message);
  } finally {
    // Hide loader
    loader.classList.add("hidden");
  }
}
