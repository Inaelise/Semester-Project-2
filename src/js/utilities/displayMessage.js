export function displayMessage(containerId, message) {
  const container = document.getElementById(containerId);
  if (container) {
    container.textContent = message;
  }
}
