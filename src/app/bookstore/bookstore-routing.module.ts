import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { BookstoreComponent } from './bookstore.component';
import { BookstoreContainerComponent } from './components/bookstore-container/bookstore-container.component';
import { BookstoreHomeComponent } from './components/bookstore-home/bookstore-home.component';

const routes: Routes = [
    {
        path: '', component: BookstoreContainerComponent, children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: BookstoreHomeComponent }

        ]
    },
    { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class BookstoreRoutingModule { }
