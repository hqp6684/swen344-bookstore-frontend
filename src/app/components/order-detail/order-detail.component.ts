import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Order } from '../../shared/models/order';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../core/services/authentication.service';
import { OrderService } from '../../core/services/order.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Book } from '../../shared/models/book';
import { MdSnackBar, MdDialog, MdDialogConfig, MdDialogRef } from '@angular/material';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  order = new Order();
  private $key = '';
  confirmDiaglogRef: MdDialogRef<ConfirmDialogComponent>;

  constructor(
    public orderService: OrderService,
    public authService: AuthenticationService,
    public router: Router,
    public route: ActivatedRoute,
    public dialog: MdDialog,
    private db: AngularFireDatabase

  ) { }

  ngOnInit() {
    this.$key = this.route.snapshot.params['id'];
    this.orderService.getOrder(this.$key).subscribe(order => {
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
  openConfirmCancelDialog() {
    const dialogConfig: MdDialogConfig = {
      data: {
        message: 'Do you want to cancel this order ?'
      }
    };
    this.confirmDiaglogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    this.confirmDiaglogRef.afterClosed()
      .subscribe((confirm: boolean) => {
        if (confirm) {
          this.order.status = 'Canceled';
          this.orderService.getOrder(this.$key).update(this.order);

        }
      });
  }

  completeOrder() {
    const bookCount = this.getBookCount();
    Object.keys(bookCount).map(k => {
      this.orderService.updateBookCount(k, bookCount[k]);
    });
    this.order.status = 'Completed';
    this.orderService.getOrder(this.$key).update(this.order);
  }

  private getBookCount() {
    const bookCount = new Object();
    this.order.books.map(b => {
      bookCount[b.isbn] ? bookCount[b.isbn]++ : bookCount[b.isbn] = 1;

    });
    return bookCount;



  }


}
