import { BookstoreService } from './bookstore.service';
import { BookstoreRoutingModule } from './bookstore-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookstoreContainerComponent } from './components/bookstore-container/bookstore-container.component';
import { BookstoreHomeComponent } from './components/bookstore-home/bookstore-home.component';
import { BookstoreTopToolbarComponent } from './components/bookstore-top-toolbar/bookstore-top-toolbar.component';
import { BookstoreLeftSidenavComponent } from './components/bookstore-left-sidenav/bookstore-left-sidenav.component';
import { BookshelfComponent } from './components/bookshelf/bookshelf.component';
import { BookComponent } from './components/book/book.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    BookstoreRoutingModule,
  ],
  declarations: [BookstoreContainerComponent,
    BookstoreHomeComponent,
    BookstoreTopToolbarComponent, BookstoreLeftSidenavComponent, BookshelfComponent, BookComponent],
  providers: [BookstoreService]
})
export class BookstoreModule { }
