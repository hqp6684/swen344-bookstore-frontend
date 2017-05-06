import { Router } from '@angular/router';
import { Order } from '../../shared/models/order';
import { Observable } from 'rxjs/Rx';
import { OrderService } from '../../core/services/order.service';
import { AuthenticationService } from '../../core/services/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders: Observable<Order[]>;
  constructor(
    public authService: AuthenticationService,
    public orderService: OrderService,
    public router: Router,
  ) { }

  ngOnInit() {
    this.orders = this.orderService.getOrders()
      .map(value => { console.log(value); return value; });
  }


  getStatusIcon(order: Order) {
    switch (order.status) {
      case 'Pending': return 'hourglass_empty';
      case 'Completed': return 'done';
      case 'Canceled': return 'cancel';
    }

  }

  viewOrder(order: Order) {
    this.router.navigate(['/orders/', order.$key]);

  }

}
