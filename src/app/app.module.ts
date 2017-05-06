import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HeaderComponent } from './components/header/header.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AngularFireModule } from 'angularfire2';
import { firebaseConfig } from '../environments/firebase.config';
import { BooksComponent } from './components/books/books.component';
import { NewBookComponent } from './components/new-book/new-book.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OrdersComponent } from './components/orders/orders.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { BookEditComponent } from './components/book-edit/book-edit.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    HeaderComponent,
    RegisterComponent,
    LoginComponent,
    BooksComponent,
    NewBookComponent,
    BookDetailComponent,
    CheckoutComponent,
    OrdersComponent,
    OrderDetailComponent,
    BookEditComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    // AngularFireModule.initializeApp(firebaseConfig),

    CoreModule.forRoot(),
    BrowserAnimationsModule,
    AppRoutingModule,
    // AccountModule,
    // BookAdminModule,
    // BookstoreModule,
    // BookManagementModule

  ],
  providers: [AppService],
  bootstrap: [AppComponent],
  entryComponents: [
    ConfirmDialogComponent
  ]
})
export class AppModule { }
