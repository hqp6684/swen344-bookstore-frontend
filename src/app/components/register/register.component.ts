import { AuthenticationService } from '../../core/services/authentication.service';
import { Router } from '@angular/router';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { Component, OnInit } from '@angular/core';
import { Account, AccountType } from '../../shared/models/account';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  emailFormControl: FormControl = new FormControl();
  message = '';
  accountType: AccountType = 'student';
  accountTypes = ['student', 'admin', 'professor'];
  emailStatus = '';
  formIsValue = false;
  account: Account;
  private accRef: FirebaseListObservable<any>;
  constructor(private db: AngularFireDatabase,
    private authService: AuthenticationService,
    public router: Router) {
    this.accRef = this.db.list('/accounts');

  }

  ngOnInit() {
    this.emailFormControl.valueChanges
      .distinctUntilChanged()
      .debounceTime(200)
      .subscribe(value => {
        this.emailStatus = 'hourglass_empty';

        // let newAccountKey = this.db.
        this.isEmailValid(value).subscribe(isValid => {
          if (isValid) {
            this.emailStatus = 'check';
            this.formIsValue = true;
            this.account = { email: <string>value, password: 'password', type: this.accountType };
          } else {
            this.emailStatus = 'error';
            this.formIsValue = false;
          }

        });

      });

  }

  private newAccount() {
    const key = this.accRef.push(this.account).key;
    this.authService.login(this.account.email);
  }

  private isEmailValid(email: string) {

    return this.db.list('/accounts', {
      query: {
        orderByChild: 'email',
        equalTo: email,
        limitToFirst: 2
      }
    }).map(value => {
      if (value.length > 0 || email.length === 0) {
        return false;
      } else {
        return true;
      }
    });


  }

}
