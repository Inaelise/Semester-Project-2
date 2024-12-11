import "./css/style.css";
import { displayHeader } from "./js/utilities/displayHeader";
import { toggleDropdown } from "./js/utilities/toggleDropdown";
import router from "./js/router";

displayHeader();
toggleDropdown();
await router(window.location.pathname);
