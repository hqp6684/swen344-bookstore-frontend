import { Router } from '@angular/router';
import { AuthenticationService } from '../../core/services/authentication.service';
import { Book } from '../../shared/models/book';
import { Order } from '../../shared/models/order';
import { OrderService } from '../../core/services/order.service';
import { Component, OnInit } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  subtotal = 0;
  total = 0;
  discount = 0;
  shipping = 0;
  shipToOptions = ['Home', 'RIT Default Address', 'RIT Post Office'];
  ship_to: string = this.shipToOptions[1];
  discountFormControl = new FormControl();


  constructor(
    public orderService: OrderService,
    public snackBar: MdSnackBar,
    public authService: AuthenticationService,
    public router: Router,
  ) { }

  ngOnInit() {
    this.calculateTotal();
    this.discountFormControl
      .valueChanges
      .debounceTime(200)
      .subscribe(code => {
        switch (code) {
          case 'BAZOOKA':
            this.discount = (this.subtotal / 100) * 99;
            this.calculateTotal();
            break;
          default:
            this.discount = 0;
            this.calculateTotal();
            break;
        }
      });
  }
  clearCart() {
    this.orderService.books = [];
    this.calculateTotal();
    this.snackBar.open('Your shopping cart has been emptied', 'Dismiss', { duration: 2000 });


  }
  removeBook(index: number) {
    const book = this.orderService.books.splice(index, 1)[0];
    this.snackBar.open(book.title + ' has been removed', 'Dismiss', { duration: 2000 });
    this.calculateTotal();

  }
  checkout() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }

    // if(this.orderService.books.length === 0){

    // }

    const order: Order = {
      email: this.authService.account.email,
      time: new Date().toString(),
      books: this.orderService.books,
      total: this.total,
      ship_to: this.ship_to,
      status: 'Pending',
      subtotal: this.subtotal,
      discount_code: this.discountFormControl.value,
      discount: this.discount,
      shipping: this.shipping,
    };

    this.orderService.newOrder(order);

  }


  calculateSubTotal() {
    this.subtotal = 0;
    this.orderService.books.map(b => {
      this.subtotal += Number(b.price);
    });
  }

  calculateTotal() {
    this.calculateSubTotal();
    this.total = this.subtotal - this.discount + this.shipping;
  }

}
