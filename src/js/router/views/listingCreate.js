import { onCreate } from "../../ui/post/create";
import { authGuard } from "../../utilities/authGuard";

authGuard();

const form = document.forms.createListing;

form.addEventListener("submit", onCreate);
