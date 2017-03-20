import { AuthGuardService } from '../core/services/auth-guard.service';
import { AccountService } from './account.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountHomeComponent } from './components/account-home/account-home.component';

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthGuardService],
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: AccountHomeComponent }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AccountRoutingModule { }
