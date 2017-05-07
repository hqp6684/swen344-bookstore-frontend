import { AsyncSubject, Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { Order } from '../../shared/models/order';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AuthenticationService } from './authentication.service';
import { Book } from '../../shared/models/book';
import { Injectable } from '@angular/core';
import { MdSnackBar } from '@angular/material';

@Injectable()
export class OrderService {
  books: Book[] = [];

  constructor(private authService: AuthenticationService,
    private db: AngularFireDatabase,
    private router: Router,
    private snackBar: MdSnackBar
  ) { }


  addBook(book: Book) {
    this.books.push(book);

    this.snackBar.open(`${book.title} has been added to your cart`, 'Dismiss', {
      duration: 2000
    });
  }


  newOrder(order: Order) {
    this.books = [];
    this.db.list('/orders').push(order);
    this.snackBar.open('Your order has been placed', 'Dismiss', { duration: 4000 });
    this.router.navigate(['/orders']);
  }

  getOrder(key: string): FirebaseObjectObservable<Order> {
    return this.db.object('/orders/'.concat(key));
  }

  getOrders(): FirebaseListObservable<Order[]> {
    if (this.authService.account.type === 'admin') {
      return this.db.list('/orders');
    }
    return this.db.list('/orders', {
      query
      : {
        orderByChild: 'email',
        equalTo: this.authService.account.email
      }
    });
  }

  updateBookCount(isbn: string, count: number) {
    this.db.list('/books', {
      query: {
        orderByChild: 'isbn',
        equalTo: isbn
      }
    }).subscribe((books: Book[]) => {
      const firebook = books[0];
      firebook.count = Number(firebook.count) - count;
      this.db.object('/books/'.concat(firebook.$key)).update(firebook);
    });

  }

  canReview(isbn: string): Observable<boolean> {
    const result = new AsyncSubject<boolean>();
    if (!this.authService.isAuthenticated()) {
      result.next(false);
      result.complete();
      return result;
    }
    this.db.list('/orders', {
      query: {
        orderByChild: 'email',
        equalTo: this.authService.account.email
      }

    }).subscribe((orders: Order[]) => {
      orders.map(order => {
        if (order.status === 'Completed') {
          order.books.map(book => {
            if (book.isbn === isbn) {
              result.next(true);
              result.complete();
            }
          });
        }
      });
      result.next(false);
      result.complete();

    });
    return result;

  }


}
