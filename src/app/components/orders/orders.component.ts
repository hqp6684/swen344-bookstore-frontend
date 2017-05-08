import { Router } from '@angular/router';
import { Order } from '../../shared/models/order';
import { Observable } from 'rxjs/Rx';
import { OrderService } from '../../core/services/order.service';
import { AuthenticationService } from '../../core/services/authentication.service';
import { Component, OnInit } from '@angular/core';

import { HostBinding } from '@angular/core';
import { routerTransition } from '../../shared/animations/route-transition.animation';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  animations: [routerTransition()]
})
export class OrdersComponent implements OnInit {
  @HostBinding('@routerTransition') routeAnimation = '';

  orders: Observable<Order[]>;
  constructor(
    public authService: AuthenticationService,
    public orderService: OrderService,
    public router: Router,
  ) { }

  ngOnInit() {
    this.orders = this.orderService.getOrders()
      .map(value => { return value; });
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
