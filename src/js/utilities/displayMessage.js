export function displayMessage(containerId, message, isSuccess = false) {
  const container = document.getElementById(containerId);
  if (container) {
    container.textContent = message;
    container.style.color = isSuccess ? "green" : "red";
  }
}
