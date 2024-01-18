import { HttpInterceptorFn } from "@angular/common/http";

export const authInterceptor: HttpInterceptorFn = (request, next) => {

    const token = localStorage.getItem('token') ?? '';
    
    const modifiedRequest = request.clone({
        setHeaders: {
            Authorization: token ? `${token}` : ''
        }
    });

    return next(modifiedRequest);
}