import { BookManagementRoutingModule } from './book-management-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BmHomeComponent } from './components/bm-home/bm-home.component';
import { CreateBookComponent } from './components/create-book/create-book.component';

@NgModule({
  imports: [
    CommonModule,
    BookManagementRoutingModule
  ],
  declarations: [BmHomeComponent, CreateBookComponent]
})
export class BookManagementModule { }
