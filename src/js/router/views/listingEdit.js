import { onDelete } from "../../ui/listing/delete";
import { onUpdateListing } from "../../ui/listing/update";
import { authGuard } from "../../utilities/authGuard";
import { populateListingEdit } from "../../utilities/populateForm";

authGuard();

const form = document.forms.editListing;

const addImgBtn = document.getElementById("add-img");
const imgContainer = document.getElementById("edit-img");

addImgBtn.addEventListener("click", () => {
  const newImg = document.createElement("div");
  newImg.className = "img-input";
  newImg.innerHTML = `
    <input
      class="input-field my-2"
      type="url"
      id="image"
      name="images[]"
      placeholder="https://exampleurl.com"
      pattern="https://.*"
    />
    <button type="button" class="img-remove hover hover:shadow-none text-white text-medium ml-2" title="Click to remove image url">&times;</button>
  `;

  imgContainer.append(newImg);
});

imgContainer.addEventListener("click", (e) => {
  if (e.target.closest(".img-remove")) {
    e.target.closest(".img-input").remove();
  }
});

form.addEventListener("submit", onUpdateListing);
populateListingEdit();

const deleteBtn = document.getElementById("delete-btn");
if (deleteBtn) {
  deleteBtn.addEventListener("click", onDelete);
}
