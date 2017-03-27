import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '../core/services/auth-guard.service';
import { BmHomeComponent } from './components/bm-home/bm-home.component';
import { CreateBookComponent } from './components/create-book/create-book.component';

const routes: Routes = [
    {
        path: '', canActivate: [AuthGuardService],
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            {
                path: 'home', component: BmHomeComponent, children: [
                    { path: 'create-book', component: CreateBookComponent },

                ]
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class BMRoutingModule { }
