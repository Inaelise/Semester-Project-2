/**
 * Creates and displays a countdown timer until a specified end time.
 * The countdown updates every second and is displayed in a specified container.
 * "Auction ended" is displayed once the countdown reaches zero.
 * @param {string} endTime - The end time for the countdown in a valid date format.
 * @param {HTMLElement} endTimeContainer - The container element where the countdown will be displayed.
 */
export function createCountdown(endTime, endTimeContainer) {
  // Create elements for the countdown timer
  const countdownValue = document.createElement("p");

  endTimeContainer.append(countdownValue);

  let timerInterval;

  // Countdown logic
  function updateCountdown() {
    const now = new Date();
    const endDate = new Date(endTime);
    const timeDifference = endDate.getTime() - now.getTime();

    if (timeDifference <= 0) {
      // If the countdown is over
      countdownValue.textContent = "Auction ended";
      clearInterval(timerInterval);
      return;
    }

    // Calculate time components
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );

    // Update the countdown display
    countdownValue.textContent = `${days}d ${hours.toString().padStart(2, "0")}h ${minutes
      .toString()
      .padStart(2, "0")}m`;
  }

  // Start the countdown
  updateCountdown(); // Run immediately to initialize
  timerInterval = setInterval(updateCountdown, 1000);
}
