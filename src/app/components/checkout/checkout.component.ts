import { OrderService } from '../../core/services/order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  total = 0;
  constructor(
    public orderService: OrderService
  ) { }

  ngOnInit() {
    this.orderService.books.map(b => {
      this.total += b.price;
    });
  }

}
