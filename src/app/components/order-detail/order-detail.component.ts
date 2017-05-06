import { Order } from '../../shared/models/order';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../core/services/authentication.service';
import { OrderService } from '../../core/services/order.service';
import { Component, OnInit } from '@angular/core';
import { FirebaseObjectObservable } from 'angularfire2/database';
import { Book } from '../../shared/models/book';
import { MdSnackBar } from '@angular/material';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  order = new Order();
  constructor(
    public orderService: OrderService,
    public authService: AuthenticationService,
    public router: Router,
    public route: ActivatedRoute,

  ) { }

  ngOnInit() {
    const $key = this.route.snapshot.params['id'];
    this.orderService.getOrder($key).subscribe(order => {
      if (this.authService.account.type !== 'admin') {
        if (order.email !== this.authService.account.email) {
          this.router.navigate(['../']);
        }
      }
      this.order = order;
    });

  }


  getStatusIcon(order: Order) {
    switch (order.status) {
      case 'Pending': return 'hourglass_empty';
      case 'Completed': return 'done';
      case 'Canceled': return 'cancel';
    }

  }


}
