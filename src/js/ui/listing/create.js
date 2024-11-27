import { createListing } from "../../api/listing/create";
import { displayMessage } from "../../utilities/displayMessage";

export async function onCreate(e) {
  e.preventDefault();

  const createForm = e.target;
  const formData = new FormData(createForm);
  const data = Object.fromEntries(formData.entries());

  const endDate = data["end-date"];
  const endTime = data["end-time"];
  const endsAt = new Date(`${endDate}T${endTime}:00Z`).toISOString();
  data.endsAt = endsAt;

  data.media = [{ url: data.image, alt: "" }];
  delete data.image;

  data.tags = data.tags.split(",").map((tag) => tag.trim());

  try {
    const newListing = await createListing(data);
    displayMessage("message", "Listing created successfully! Redirecting..");
    setTimeout(() => {
      window.location.href = `/listing/?id=${newListing.id}`;
    }, 3000);
  } catch (error) {
    displayMessage("message", error.message);
  }
}
