import { AuthenticationService } from '../core/services/authentication.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AccountService {

  constructor(private authService: AuthenticationService) { }

  getProfile() {
    const profile: AccountProfile = JSON.parse(this.authService.accountProfile);

  }


}


interface AccountProfile {
  ClientID: string;
  created_at: string;
  email: string;
  email_verified: boolean;
  family_name: string;
  gender: string;
  given_name: string;
  global_client_id: string;
  name: string;
  nickname: string;
  picture: string;
  user_id: string;
}

