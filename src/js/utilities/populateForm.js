import { activeUser } from "./activeUser";
import { activeListingId } from "./activeListingId";
import { getProfile } from "../api/profile/read";
import { getListing } from "../api/listing/read";

export async function populateListingEdit() {
  const listingId = activeListingId();

  const form = document.forms.editListing;

  try {
    const listing = await getListing(listingId);

    form["title"].value = listing.title || "";
    form["description"].value = listing.description || "";

    const firstMediaUrl =
      listing.media && listing.media.length > 0 ? listing.media[0].url : "";

    form["image"].value = firstMediaUrl;
    form["tags"].value = listing.tags ? listing.tags.join(", ") : "";
  } catch (error) {
    //temporary error alert
    alert("Error loading post data to input fields.");
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
    //temporary error alert
    alert("Error loading profile data to input fields.");
  }
}
