import { inject } from "@angular/core";
import { AuthInfoService } from "../services/auth/auth-info.service";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";

function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}  

export const authGuard = async (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {

    const authInfoService = inject(AuthInfoService);
    const router = inject(Router);

    if(authInfoService.currentUserSignal() === undefined || authInfoService.currentUserSignal() === null) 
        await sleep(500);

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