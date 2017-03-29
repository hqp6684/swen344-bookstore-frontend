import { BookManagementModule } from './book-management/book-management.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BookstoreModule } from './bookstore/bookstore.module';
import { AccountModule } from './account/account.module';
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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    CoreModule.forRoot(),
    BrowserAnimationsModule,
    AppRoutingModule,
    // AccountModule,
    // BookAdminModule,
    BookstoreModule,
    BookManagementModule

  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
