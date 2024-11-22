import { updateProfile } from "../../api/profile/update";
import { activeUser } from "../../utilities/activeUser";

export async function onUpdateProfile(e) {
  e.preventDefault();
  const user = activeUser();

  const updateForm = e.target;
  const formData = new FormData(updateForm);
  const data = Object.fromEntries(formData.entries());

  data.media = [{ url: data.avatar, alt: "" }];
  delete data.avatar;

  try {
    await updateProfile(user, data);
    window.location.href = "/profile/";
  } catch (error) {
    //Temporary error alert
    alert("Error updating profile: " + error.message);
  }
}
