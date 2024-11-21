import { onCreate } from "../../ui/listing/create";
import { authGuard } from "../../utilities/authGuard";

authGuard();

const form = document.forms.createListing;

form.addEventListener("submit", onCreate);
