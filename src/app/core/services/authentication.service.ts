import { NavigationStart, Router, ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';

import Auth0Lock from 'auth0-lock';
// declare var Auth0Lock: any;


@Injectable()
export class AuthenticationService {
  private lock = new Auth0Lock('nbpw8VSBhrjfONvZwh97xnHf27lq5fWf', 'hpham.auth0.com', {
    auth: {
      redirectUrl: location.origin + '/login',
      responseType: 'token',
    }
  });


  /**
   * Is used to redirect after login
   */
  private redirectUrlKey = 'redirectUrl';
  redirectUrl: string;

  id_token: string;
  accountProfile: any;


  constructor(private router: Router, private route: ActivatedRoute) {

    this.lock.on('authenticated', (authResult) => {
      localStorage.setItem('id_token', authResult.idToken);
      this.id_token = authResult.idToken;

      const bookstoreRedirectUrl: string = localStorage.getItem(this.redirectUrlKey);
      // // get rid of localStorage of url
      localStorage.removeItem(this.redirectUrlKey);
      // navigate to original url

      // Fetch profile information
      this.lock.getProfile(authResult.idToken, (error: any, profile: any) => {
        if (error) {
          // Handle error
          alert(error);
          return;
        }

        localStorage.setItem('profile', JSON.stringify(profile));
        this.accountProfile = profile;
      });
      // WARNING this is a sketchy way of handling redirect after auth0 authenticated
      // TODO, create a seperate component to handle auth0 callback url
      window.setTimeout(() => {
        // this.router.navigate([bookstoreRedirectUrl]);
        this.router.navigate([bookstoreRedirectUrl]);
      }, 1000);
    });

  }


  public login() {
    if (this.redirectUrl) {
      localStorage.setItem(this.redirectUrlKey, this.redirectUrl);
    } else {
      localStorage.setItem(this.redirectUrlKey, this.router.url);
    }
    // Call the show method to display the Auth0 widget.
    this.lock.show();
  }

  public isAuthenticated(): boolean {
    // Check if there's an unexpired JWT
    // This searches for an item in localStorage with key == 'id_token'
    return tokenNotExpired();
  }

  public logout() {
    // Remove token from localStorage
    // localStorage.removeItem('id_token');
    localStorage.clear();
    this.router.navigate(['/home']);
  }

}
