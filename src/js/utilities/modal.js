const modal = document.getElementById("update-modal");

export function openModal() {
  modal.classList.remove("hidden");
}

export function closeModal() {
  modal.classList.add("hidden");
}
