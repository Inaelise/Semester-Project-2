import { createListing } from "../../api/listing/create";

export async function onCreate(e) {
  e.preventDefault();

  const createForm = e.target;
  const formData = new FormData(createForm);
  const data = Object.fromEntries(formData.entries());

  const endDate = data["end-date"];
  const endTime = data["end-time"];
  const endsAt = new Date(`${endDate}T${endTime}:00Z`).toISOString();
  data.endsAt = endsAt;

  /*  const media = {
    url: data.url,
    alt: "",
  };

  delete data.url;
  data.media = media; */

  data.media = [{ url: data.image, alt: "" }];
  delete data.image;

  data.tags = data.tags.split(",").map((tag) => tag.trim());

  try {
    const newListing = await createListing(data);
    window.location.href = `/listing/?id=${newListing.id}`;
  } catch (error) {
    //Temporary error alert
    alert("Error creating post: " + error.message);
  }
}
