import { getProfile } from "../../api/profile/read";
import { activeUser } from "../../utilities/activeUser";
import { closeModal, openModal } from "../../utilities/modal";

export async function viewProfile() {
  const user = activeUser();
  const closeBtn = document.getElementById("close-modal");
  closeBtn.addEventListener("click", closeModal);

  try {
    const profile = await getProfile(user);

    const profileContainer = document.getElementById("profile-container");

    const creditsDiv = document.createElement("div");
    const creditsIcon = document.createElement("span");
    creditsIcon.innerHTML = `<i class="fa-solid fa-coins"></i>`;

    const credits = document.createElement("p");
    credits.textContent = profile.credits;

    creditsDiv.append(creditsIcon, credits);

    const img = document.createElement("img");
    img.src = profile.avatar.url;

    const userName = document.createElement("h2");
    userName.textContent = profile.name;

    const bio = document.createElement("p");
    bio.textContent = profile.bio;

    const listingCountDiv = document.createElement("div");
    const listingCountText = document.createElement("p");
    listingCountText.textContent = "Listings";

    const listingCount = document.createElement("p");
    listingCount.textContent = profile._count.listings;

    listingCountDiv.append(listingCount, listingCountText);

    const winCountDiv = document.createElement("div");
    const winCountText = document.createElement("p");
    winCountText.textContent = "Wins";

    const winCount = document.createElement("p");
    winCount.textContent = profile._count.wins;

    winCountDiv.append(winCount, winCountText);

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit profile";
    editBtn.id = "edit-btn";
    editBtn.addEventListener("click", openModal);

    profileContainer.append(
      creditsDiv,
      img,
      userName,
      bio,
      listingCountDiv,
      winCountDiv,
      editBtn
    );

    return profileContainer;
  } catch (error) {
    //Temporary error alert
    alert(error.message);
  }
}
