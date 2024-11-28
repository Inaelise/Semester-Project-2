import { activeUser } from "./activeUser";
import { activeListingId } from "./activeListingId";
import { getProfile } from "../api/profile/read";
import { getListing } from "../api/listing/read";
import { displayMessage } from "./displayMessage";

export async function populateListingEdit() {
  const listingId = activeListingId();

  const form = document.forms.editListing;

  try {
    const listing = await getListing(listingId);

    form["title"].value = listing.title || "";
    form["description"].value = listing.description || "";
    form["tags"].value = listing.tags ? listing.tags.join(", ") : "";

    const editImg = document.getElementById("edit-img");
    editImg.innerHTML = "";

    if (listing.media && listing.media.length > 0) {
      listing.media.forEach((img) => {
        const imgInput = document.createElement("div");
        imgInput.className = "img-input";
        imgInput.innerHTML = `<input
            type="url"
            name="images[]"
            placeholder="https://exampleurl.com"
            pattern="https://.*"
            value="${img.url}"
          />
          <button type="button" class="img-remove" title="Click to remove image URL">
            <i class="fa-solid fa-trash"></i>
          </button>`;

        editImg.append(imgInput);
      });
    } else {
      const imgInput = document.createElement("div");
      imgInput.className = "img-input";
      imgInput.innerHTML = `<input
            type="url"
            name="images[]"
            placeholder="https://exampleurl.com"
            pattern="https://.*"
          />
          <button type="button" class="img-remove" title="Click to remove image URL">
            <i class="fa-solid fa-trash"></i>
          </button>`;

      editImg.append(imgInput);
    }
  } catch (error) {
    displayMessage("message", "Error loading input field data.");
  }
}

export async function populateProfileEdit() {
  const user = activeUser();

  try {
    const profile = await getProfile(user);
    const form = document.forms.editProfile;

    form["name"].value = profile.name || "";
    form["avatar"].value = profile.avatar?.url || "";
    form["bio"].value = profile.bio || "";
  } catch (error) {
    displayMessage("message", "Error loading input field data.");
  }
}
