import { NavigationStart, Router, ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { AccountProfile } from 'app/account/account.service';


import { AngularFireDatabase } from 'angularfire2/database';
import { Account } from '../../shared/models/account';



@Injectable()
export class AuthenticationService {


  /**
   * Is used to redirect after login
   */
  private redirectUrlKey = 'redirectUrl';
  redirectUrl: string;

  id_token: string;
  private accountProfile: any;
  account: Account;
  private authenticated = false;



  constructor(private router: Router, private route: ActivatedRoute, private db: AngularFireDatabase) {

  }


  public login(email: string, pass?: string) {
    this.db.list('/accounts', {
      query: {
        orderByChild: 'email',
        equalTo: email,
        limitToFirst: 1
      }
    }).subscribe(acc => {
      if (acc.length === 1) {
        // check pass here
        // if acc.pass === pass
        // but pass for now
        this.account = acc[0];
        this.authenticated = true;

        localStorage.setItem('isAuthenticated', '1');
        this.router.navigate(['/']);

      } else {
        this.router.navigate(['/login']);
      }
    });
    // if (this.redirectUrl) {
    //   localStorage.setItem(this.redirectUrlKey, this.redirectUrl);
    // } else {
    //   localStorage.setItem(this.redirectUrlKey, this.router.url);
    // }
    // Call the show method to display the Auth0 widget.
  }

  public isAuthenticated(): boolean {
    // Check if there's an unexpired JWT
    // This searches for an item in localStorage with key == 'id_token'
    if (localStorage.getItem('isAuthenticated') === '1') {
      this.authenticated = true;
    }
    return this.authenticated;
  }

  public logout() {
    // Remove token from localStorage
    // localStorage.removeItem('id_token');
    localStorage.clear();
    this.account = null;
    this.authenticated = false;
    this.router.navigate(['/home']);
  }

  getProfile() {
    if (this.isAuthenticated()) {
      // const profile: AccountProfile = JSON.parse(this.accountProfile);
      return this.account;
    } else {
      return undefined;
    }
  }
}
