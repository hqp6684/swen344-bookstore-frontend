import { AuthenticationService } from '../../core/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
// import {AuthService} from "../shared/security/auth.service";
import { Router } from '@angular/router';
// import { AngularFireDatabase } from 'angularfire2/
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  emailFormControl: FormControl = new FormControl();
  message = '';
  formIsValid = false;

  emailStatus = '';
  constructor(private fb: FormBuilder,
    private router: Router,
    private db: AngularFireDatabase,
    private authService: AuthenticationService
  ) {

    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    // this.db.list('/accounts').subscribe(data => { console.log(data); });


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
            this.formIsValid = true;
            this.message = '';
          } else {
            this.emailStatus = 'error';
            this.message = '** Email not found';
            this.formIsValid = false;
          }

        });

      });
  }


  login() {
    this.authService.login(this.emailFormControl.value);

  }

  private isEmailValid(email: string) {

    return this.db.list('/accounts', {
      query: {
        orderByChild: 'email',
        equalTo: email,
        limitToFirst: 2
      }
    }).map(value => {
      if (value.length > 0 && email.length > 0) {
        return true;
      } else {
        return false;
      }
    });


  }
}
