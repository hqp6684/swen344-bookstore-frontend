import { Book } from '../../models/book';
import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  @Input('book') book: Book;
  constructor() { }

  ngOnInit() {
  }

}
