import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const url = state.url;
    return this.checkAuthenticated(url);
  }

  checkAuthenticated(url: string) {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      this.authService.redirectUrl = url;
      // this.authService.login();
      this.router.navigate([
        '/login'
      ]);
      return false;
    }
  }

}
