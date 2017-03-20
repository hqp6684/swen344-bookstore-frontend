import { AccountRoutingModule } from './account-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountHomeComponent } from './components/account-home/account-home.component';
import { AccountComponent } from './components/account/account.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AccountRoutingModule
  ],
  declarations: [AccountHomeComponent, AccountComponent]
})
export class AccountModule { }
