import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService } from '../shared/authservice.service';
import { Observable, of } from 'rxjs';
import { switchMap, map, catchError} from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthserviceService);

 var accessToken= authService.getToken()

  if(!accessToken){
    router.navigate(['']);
    return false
  }

  return authService.refreshToken('http://localhost:3000/auth/refresh').pipe(
    switchMap((response: any) => {
      if (response.newAccessToken) {
        authService.setToken(response.newAccessToken); // Cập nhật token mới
        return authService.checkIsAdmin('http://localhost:3000/auth/isAdmin', response.newAccessToken).pipe(
          map((isAdmin: boolean) => {
            if (isAdmin) {
              return true; // Cho phép truy cập nếu là admin
            } else {
              router.navigate(['']);
              return false; // Không cho phép truy cập nếu không phải admin
            }
          }),
          catchError(error => {
            console.error('Error checking admin status:', error);
            router.navigate(['']);
            return of(false);
          })
        );
      } else {
        router.navigate(['']);
        return of(false); // Không có accessToken mới, điều hướng tới trang not-authorized
      }
    }),
    catchError(error => {
      console.error('Error refreshing token:', error);
      router.navigate(['']);
      return of(false);
    })
  );
}
