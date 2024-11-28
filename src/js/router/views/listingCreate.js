import { onCreate } from "../../ui/listing/create";
import { authGuard } from "../../utilities/authGuard";

authGuard();

const form = document.forms.createListing;

const addImgBtn = document.getElementById("add-img");
const imgContainer = document.getElementById("img-container");

addImgBtn.addEventListener("click", () => {
  const newImg = document.createElement("div");
  newImg.className = "img-input";
  newImg.innerHTML = `
    <input
      type="url"
      id="image"
      name="images[]"
      placeholder="https://exampleurl.com"
      pattern="https://.*"
    />
    <button type="button" class="img-remove" title="Click to remove image url"><i class="fa-solid fa-trash"></i></button>
  `;

  imgContainer.append(newImg);
});

imgContainer.addEventListener("click", (e) => {
  /* if (e.target.classList.contains("img-remove")) {
    console.log("Remove button clicked");
    e.target.closest(".image-input").remove();
  } */
  if (e.target.closest(".img-remove")) {
    e.target.closest(".img-input").remove();
  }
});

form.addEventListener("submit", onCreate);
