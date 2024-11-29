import "./css/style.css";

import router from "./js/router";
import { displayHeader } from "./js/utilities/displayHeader";

await router(window.location.pathname);

displayHeader();
