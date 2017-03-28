import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bookstore-left-sidenav',
  templateUrl: './bookstore-left-sidenav.component.html',
  styleUrls: ['./bookstore-left-sidenav.component.scss']
})
export class BookstoreLeftSidenavComponent implements OnInit {
  folders = [
    {
      name: 'Photos',
      updated: new Date('1/1/16'),
    },
    {
      name: 'Recipes',
      updated: new Date('1/17/16'),
    },
    {
      name: 'Work',
      updated: new Date('1/28/16'),
    }
  ];
  notes = [
    {
      name: 'Vacation Itinerary',
      updated: new Date('2/20/16'),
    },
    {
      name: 'Kitchen Remodel',
      updated: new Date('1/18/16'),
    }
  ];
  constructor() { }

  ngOnInit() {
  }

}
