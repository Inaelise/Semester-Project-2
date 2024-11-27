import { getCredits } from "../../api/profile/credits";
import { activeUser } from "../../utilities/activeUser";
import { displayMessage } from "../../utilities/displayMessage";

export async function displayCredits() {
  const credits = document.getElementById("credits");
  const user = activeUser();

  try {
    const amount = await getCredits(user);
    if (credits) {
      credits.textContent = amount.credits;
    }
  } catch (error) {
    displayMessage("credits", error.message);
  }
}
