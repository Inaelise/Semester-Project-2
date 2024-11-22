import { authGuard } from "../../utilities/authGuard";
import { viewProfile } from "../../ui/profile/viewProfile";
import { onUpdateProfile } from "../../ui/profile/update";
import { populateProfileEdit } from "../../utilities/populateForm";

authGuard();

const form = document.forms.editProfile;
form.addEventListener("submit", onUpdateProfile);
populateProfileEdit();

viewProfile();
