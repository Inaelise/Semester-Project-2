/**
 * Displays a message in a specified container, with the message color indicating success or error.
 * It sets the message text and adjusts the text color based on the `isSuccess` parameter.
 * @param {string} containerId - The ID of the container element where the message will be displayed.
 * @param {string} message - The message text to be displayed.
 * @param {boolean} [isSuccess=false] - It determines the color of the message. If true, the message is displayed in green (success), otherwise, it is displayed in red (error).
 */
export function displayMessage(containerId, message, isSuccess = false) {
  const container = document.getElementById(containerId);
  if (container) {
    container.textContent = message;
    container.style.color = isSuccess ? "green" : "red";
  }
}
