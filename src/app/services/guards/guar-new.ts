import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { catchError, map } from "rxjs/operators";
import { of } from "rxjs";
import { LogInPage } from "src/app/pages/log-in/log-in.page";
// import { ApiService } from 'src/app/services/api.service';

export const canActivateUsuario: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(LogInPage);
  const router = inject(Router);

  return of(true);
};
