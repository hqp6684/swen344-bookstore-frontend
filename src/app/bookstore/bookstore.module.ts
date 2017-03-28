import { BookstoreRoutingModule } from './bookstore-routing.module';
import { SharedModule } from '../shared/shared.module';
import { BookstoreComponent } from './bookstore.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookstoreContainerComponent } from './components/bookstore-container/bookstore-container.component';
import { BookstoreHomeComponent } from './components/bookstore-home/bookstore-home.component';
import { BookstoreTopToolbarComponent } from './components/bookstore-top-toolbar/bookstore-top-toolbar.component';
import { BookstoreLeftSidenavComponent } from './components/bookstore-left-sidenav/bookstore-left-sidenav.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    BookstoreRoutingModule,
  ],
  declarations: [BookstoreContainerComponent, BookstoreHomeComponent, BookstoreTopToolbarComponent, BookstoreLeftSidenavComponent],
})
export class BookstoreModule { }
