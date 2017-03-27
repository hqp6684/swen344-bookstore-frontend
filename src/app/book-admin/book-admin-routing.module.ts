import { AuthGuardService } from '../core/services/auth-guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashBoardComponent } from './components/dash-board/dash-board.component';
import { CreateBookComponent } from './components/create-book/create-book.component';

const routes: Routes = [
    {
        path: '', canActivate: [AuthGuardService],
        children: [
            { path: '', redirectTo: 'dash-board', pathMatch: 'full' },
            {
                path: 'dash-board', component: DashBoardComponent, children: [
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
export class BookAdminRoutingModule { }
