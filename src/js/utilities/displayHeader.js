import { activeUser } from "./activeUser";
import { onLogout } from "../ui/global/logout";

export function displayHeader() {
  const header = document.querySelector("header");

  if (header) {
    const loggedIn = activeUser();

    if (loggedIn) {
      header.innerHTML = `
      <a href="/" title="Go to home">
        <img src="/images/logo-white.png" alt="Company logo" />
      </a>
      <nav>
        <ul>
          <li><a href="/" title="Go to home">Home</a></li>
          <li><a href="/profile/" title="Go to profile">Profile</a></li>
          <li>
            <a href="/listing/create/" title="Go to create listing"
              ><i class="fa-solid fa-circle-plus"></i
            ></a>
          </li>
        </ul>
      </nav>
      <div>
        <button id="logout-btn" title="Click to log out">Log out</button>
      </div>
      <div class="hamburger" title="Click to open/close menu">
        <div class="bar-one"></div>
        <div class="bar-two"></div>
        <div class="bar-three"></div>
      </div>
      `;
      onLogout();
    } else {
      header.innerHTML = `
      <a href="/" title="Go to home">
        <img src="/images/logo-white.png" alt="Company logo" />
      </a>
      <nav>
        <ul>
          <li><a href="/auth/login/" title="Go to login">Log in</a></li>
          <li><a href="/auth/register/" title="Go to register">Sign up</a></li>
        </ul>
      </nav>
      <div class="hamburger" title="Click to open/close menu">
        <div class="bar-one"></div>
        <div class="bar-two"></div>
        <div class="bar-three"></div>
      </div>
      `;
    }
  }
}
