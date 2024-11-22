import { onDelete } from "../../ui/listing/delete";
import { onUpdateListing } from "../../ui/listing/update";
import { authGuard } from "../../utilities/authGuard";
import { populateListingEdit } from "../../utilities/populateForm";

authGuard();

const form = document.forms.editListing;

form.addEventListener("submit", onUpdateListing);
populateListingEdit();

const deleteBtn = document.getElementById("delete-btn");
if (deleteBtn) {
  deleteBtn.addEventListener("click", onDelete);
}
