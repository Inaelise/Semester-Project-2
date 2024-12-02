import { activeUser } from "./activeUser";
import { onLogout } from "../ui/global/logout";

export function displayHeader() {
  const header = document.querySelector("header");
  header.classList.add(
    "bg-main",
    "flex",
    "justify-between",
    "text-white",
    "font-header",
    "font-light",
    "text-small",
    "fixed",
    "w-full",
    "top-0",
    "drop-shadow",
    "px-6",
    "h-[65px]"
  );

  if (header) {
    const loggedIn = activeUser();

    if (loggedIn) {
      header.innerHTML = `
      <a href="/" title="Go to home">
        <img class="w-[90px]" src="/images/logo-white.png" alt="Company logo" />
      </a>
      <nav class="fixed top-[65px] bg-main right-0 pt-2 pb-4 w-[170px] md:static md:flex md:justify-center md:bg-transparent">
        <ul class ="flex flex-col gap-4 items-center md:flex-row md:gap-12">
          <li><a href="/" title="Go to home">Home</a></li><hr class="line"/>
          <li><a href="/profile/" title="Go to profile">Profile</a></li><hr class="line"/>
          <li>
            <a href="/listing/create/" title="Go to create listing"
              ><div class="bg-white w-[20px] h-[20px] rounded-full flex justify-center items-center"><span class="text-main font-black text-lg">+</span></div></a>
          </li><hr class="line md:hidden"/>
        </ul>
        <div class="pt-4 text-center md:hidden">
        <button class="logout-btn" title="Click to log out">Log out</button>
      </div>
      </nav>
      <div class="hidden md:block md:self-center">
        <button class="logout-btn" title="Click to log out">Log out</button>
      </div>
      <div class="hamburger hover:cursor-pointer self-center md:hidden" title="Click to open/close menu">
        <div class="bar bar-one"></div>
        <div class="bar bar-two"></div>
        <div class="bar bar-three"></div>
      </div>
      `;
      onLogout();
    } else {
      header.innerHTML = `
      <a href="/" title="Go to home">
        <img class="w-[90px]" src="/images/logo-white.png" alt="Company logo" />
      </a>
      <nav class="fixed top-[65px] bg-main right-0 pt-2 pb-4 w-[170px] md:pb-0 md:pt-0 md:w-full md:static md:flex md:justify-end md:items-center md:bg-transparent">
        <ul class="flex flex-col gap-4 items-center md:flex-row md:gap-8">
          <li><a class="md:hidden" href="/" title="Go to home">Home</a></li><hr class="line"/>
          <li><a class="header-btns border" href="/auth/login/" title="Go to login">Log in</a></li><hr class="line"/>
          <li><a class="header-btns bg-secondary drop-shadow-btns" href="/auth/register/" title="Go to register">Sign up</a></li>
        </ul>
      </nav>
      <div class="hamburger hover:cursor-pointer self-center md:hidden" title="Click to open/close menu">
        <div class="bar bar-one"></div>
        <div class="bar bar-two"></div>
        <div class="bar bar-three"></div>
      </div>
      `;
    }
  }
}
