import { authGuard } from "../../utilities/authGuard";
import { viewProfile } from "../../ui/profile/viewProfile";

authGuard();
viewProfile();
