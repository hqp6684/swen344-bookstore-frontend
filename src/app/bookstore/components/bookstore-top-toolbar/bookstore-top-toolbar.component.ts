import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bookstore-top-toolbar',
  templateUrl: './bookstore-top-toolbar.component.html',
  styleUrls: ['./bookstore-top-toolbar.component.scss']
})
export class BookstoreTopToolbarComponent implements OnInit {

  searchTypes = ['Book', 'Author', 'Class', 'Department'];
  searchBy = this.searchTypes[0];
  constructor() { }

  ngOnInit() {
  }

}
