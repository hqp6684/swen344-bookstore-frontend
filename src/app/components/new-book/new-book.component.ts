import { AngularFireDatabase } from 'angularfire2/database';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Book } from '../../shared/models/book';

@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.scss']
})
export class NewBookComponent implements OnInit {
  isbnStatus = '';
  isbnFormControl = new FormControl();
  formIsValid = false;
  book = new Book();

  constructor(
    private db: AngularFireDatabase

  ) {

  }

  ngOnInit() {
  }




}
