import { OrderService } from '../../core/services/order.service';
import { AuthenticationService } from '../../core/services/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(public authService: AuthenticationService,
    public orderService: OrderService
  ) { }

  ngOnInit() {
  }

}
