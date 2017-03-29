import { Book } from '../../models/book';
import { Observable } from 'rxjs/Rx';
import { BookstoreService } from '../../bookstore.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bookshelf',
  templateUrl: './bookshelf.component.html',
  styleUrls: ['./bookshelf.component.scss']
})
export class BookshelfComponent implements OnInit {
  books: Observable<Book[]>;

  constructor(private bsService: BookstoreService) { }

  ngOnInit() {
    this.books = this.bsService.getAllBooks();
  }

}
