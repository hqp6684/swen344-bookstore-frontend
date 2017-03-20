import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountHomeComponent } from './components/account-home/account-home.component';

const routes: Routes = [
    {
        path: '', children: [
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
