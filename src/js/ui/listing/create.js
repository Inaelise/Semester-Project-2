import { createListing } from "../../api/listing/create";
import { displayMessage } from "../../utilities/displayMessage";

/**
 * This function will handle the form submission for creating a listing.
 * If successful, it displays a success message and redirects to the listing page after a short delay.
 * @param {Event} event creates listing on submit.
 */
export async function onCreate(e) {
  e.preventDefault();

  const createForm = e.target;
  const formData = new FormData(createForm);
  const data = Object.fromEntries(formData.entries());

  const endDate = data["end-date"];
  const endTime = data["end-time"];
  const endsAt = new Date(`${endDate}T${endTime}:00Z`).toISOString();
  data.endsAt = endsAt;

  const imageElements = createForm.querySelectorAll("input[name='images[]']");
  data.media = Array.from(imageElements).map((input) => ({
    url: input.value,
    alt: "",
  }));

  data.tags = data.tags.split(",").map((tag) => tag.trim());

  try {
    const newListing = await createListing(data);
    displayMessage(
      "message",
      "Listing created successfully! Redirecting..",
      true
    );
    setTimeout(() => {
      window.location.href = `/listing/?id=${newListing.id}`;
    }, 1000);
  } catch (error) {
    displayMessage("message", error.message);
  }
}
