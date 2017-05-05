import { AngularFireDatabase } from 'angularfire2/database';
import { AuthenticationService } from './authentication.service';
import { Book } from '../../shared/models/book';
import { Injectable } from '@angular/core';

@Injectable()
export class OrderService {
  books: Book[] = [];

  constructor(private authService: AuthenticationService,
    private db: AngularFireDatabase
  ) { }


  addBook(book: Book) {
    this.books.push(book);
  }

}
