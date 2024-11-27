import { getCredits } from "../../api/profile/credits";
import { activeUser } from "../../utilities/activeUser";
import { displayMessage } from "../../utilities/displayMessage";

export async function displayCredits() {
  const creditContainer = document.getElementById("credits");
  const user = activeUser();

  try {
    const amount = await getCredits(user);
    if (creditContainer) {
      creditContainer.textContent = amount.credits;
    }
  } catch (error) {
    displayMessage("credits", error.message);
  }
}
