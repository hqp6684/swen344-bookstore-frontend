import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class NoStudentGuarddService implements CanActivate {


  constructor(private authService: AuthenticationService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const url = state.url;
    return this.checkAuthenticated(url);
  }

  checkAuthenticated(url: string) {
    if (this.authService.account.type === 'student') {
      this.router.navigate([
        '/'
      ]);
      return false;
    } else {
      // this.authService.login();
      return true;
    }
  }

}
