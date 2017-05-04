import { AuthGuardService } from './core/services/auth-guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { BooksComponent } from './components/books/books.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';


import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { NewBookComponent } from './components/new-book/new-book.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';

const routes: Routes = [
    { path: '', redirectTo: 'books', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    {
        path: 'books', children: [
            {
                path: '',
                component: BooksComponent
            },
            {
                canActivate: [AuthGuardService],
                path: 'new',
                component: NewBookComponent,
            },
            {
                path: ':id',
                children: [
                    { path: '', component: BookDetailComponent },
                ]
            },

        ]
    },
    { path: 'bookstore', loadChildren: 'app/bookstore/bookstore.module#BookstoreModule' },
    { path: 'account', loadChildren: 'app/account/account.module#AccountModule' },
    // { path: 'admin', loadChildren: 'app/book-admin/book-admin.module#BookAdminModule' },
    { path: 'book-management', loadChildren: 'app/book-management/book-management.module#BookManagementModule' },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
