import { inject } from "@angular/core";
import { AuthInfoService } from "../services/auth/auth-info.service";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";

export const authGuard = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {

    const authInfoService = inject(AuthInfoService);
    const router = inject(Router);

    if(authInfoService.currentUserSignal() === undefined || authInfoService.currentUserSignal() === null) {

        router.navigate(['/profil']);
        return false;
    }

    if(route.url[0].path === "manage") {

        if(authInfoService.currentUserSignal()?.user.role.includes("admin"))
            return true;
        else {
            router.navigate(['/home']);
            return false;
        }
    }

    return true;
}