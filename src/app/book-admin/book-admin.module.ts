import { BookAdminRoutingModule } from './book-admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashBoardComponent } from './components/dash-board/dash-board.component';
import { CreateBookComponent } from './components/create-book/create-book.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    BookAdminRoutingModule
  ],
  declarations: [DashBoardComponent, CreateBookComponent]
})
export class BookAdminModule { }
