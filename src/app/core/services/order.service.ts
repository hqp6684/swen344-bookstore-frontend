import { Observable } from 'rxjs/Rx';
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

}
