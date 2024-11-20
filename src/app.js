import "./css/style.css";

import router from "./js/router";

import { onLogout } from "./js/ui/global/logout";

await router(window.location.pathname);
onLogout();
