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
  <div class="ml-6">
    <input
      class="input-field my-2"
      type="url"
      id="image"
      name="images[]"
      placeholder="https://exampleurl.com"
      pattern="https://.*"
    />
    <button type="button" class="img-remove hover hover:shadow-none text-white text-medium ml-2" title="Click to remove image url">&times;</button>
  </div>
  `;

  imgContainer.append(newImg);
});

imgContainer.addEventListener("click", (e) => {
  if (e.target.closest(".img-remove")) {
    e.target.closest(".img-input").remove();
  }
});

form.addEventListener("submit", onCreate);
