import { updateProfile } from "../../api/profile/update";
import { activeUser } from "../../utilities/activeUser";
import { displayMessage } from "../../utilities/displayMessage";

/**
 * This function will handle the form submission for updating a profile.
 * @param {Event} event updates profile on submit.
 */
export async function onUpdateProfile(e) {
  e.preventDefault();
  const user = activeUser();

  const updateForm = e.target;
  const formData = new FormData(updateForm);
  const data = Object.fromEntries(formData.entries());

  data.avatar = { url: data.avatar, alt: "" };

  try {
    await updateProfile(user, data);
    displayMessage("message", "Profile updated successfully!", true);
    setTimeout(() => {
      window.location.href = "/profile/";
    }, 1000);
  } catch (error) {
    displayMessage("message", error.message);
  }
}
