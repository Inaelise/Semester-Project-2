export function openConfirmModal(message) {
  return new Promise((resolve) => {
    const modal = document.getElementById("confirm-modal");
    modal.classList.remove("hidden");

    const body = document.getElementById("modal-body");
    body.textContent = message;

    const yes = document.getElementById("yes");
    const no = document.getElementById("no");
    const closeBtn = document.getElementById("close-confirm-modal");

    const close = (response) => {
      modal.classList.add("hidden");
      yes.removeEventListener("click", onYes);
      no.removeEventListener("click", onNo);
      closeBtn.removeEventListener("click", onClose);
      resolve(response);
    };

    const onYes = () => close(true);
    const onNo = () => close(false);
    const onClose = () => close(false);

    yes.addEventListener("click", onYes);
    no.addEventListener("click", onNo);
    closeBtn.addEventListener("click", onClose);
  });
}
