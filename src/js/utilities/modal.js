const modal = document.getElementById("update-modal");

/**
 * Opens the modal by removing the `hidden` class from the modal element.
 * This makes the modal visible to the user.
 */
export function openModal() {
  modal.classList.remove("hidden");
}

/**
 * Closes the modal by adding the `hidden` class to the modal element.
 * This hides the modal from the user.
 */
export function closeModal() {
  modal.classList.add("hidden");
}
