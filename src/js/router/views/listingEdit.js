import { onUpdateListing } from "../../ui/listing/update";
import { authGuard } from "../../utilities/authGuard";

authGuard();

const form = document.forms.editListing;

form.addEventListener("submit", onUpdateListing);
