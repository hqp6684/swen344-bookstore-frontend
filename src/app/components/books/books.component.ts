import { AuthenticationService } from '../../core/services/authentication.service';
import { OrderService } from '../../core/services/order.service';
import { FormControl } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Rx';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Book } from '../../shared/models/book';
import { MdSnackBar } from '@angular/material';
import { routerTransition } from '../../shared/animations/route-transition.animation';


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
  animations: [routerTransition()],
  // host: { '[@routerTransition]': '' }
})
export class BooksComponent implements OnInit {
  @HostBinding('@routerTransition') routeAnimation = '';

  filteredBooks: Book[] = [];
  private books: Book[] = [];
  searchByValues = ['ISBN', 'Author', 'Course'];
  searchByValue = this.searchByValues[0];

  searchFormControl: FormControl = new FormControl();
  currencyTypes = ['USD', 'EUR', 'GBP', 'JPY']; currencyType = 'USD';


  constructor(
    private db: AngularFireDatabase,
    public orderService: OrderService,
    public snackBar: MdSnackBar,
    public authService: AuthenticationService
  ) { }

  ngOnInit() {
    this.db.list('/books').subscribe(values => {
      this.books = [];
      this.filteredBooks = [];

      values.map((v, i) => {
        setTimeout(() => {
          v.authors ? v.authors : v.authors = [];
          v.courses ? v.courses : v.courses = [];
          v.reviews ? v.reviews : v.reviews = new Array();
          this.books.push(v);

          this.filteredBooks.push(v);
        }, i * 100);
      });
    });
    this.triggerSearchControl();
  }

  triggerSearchControl() {
    this.searchFormControl
      .valueChanges
      .debounceTime(200)
      .subscribe(value => {
        if (!value) {
          this.filteredBooks = this.books;
          return;
        }
        switch (this.searchByValue) {
          case 'ISBN':
            this.searchByISBN(value);
            break;
          case 'Author':
            this.searchByAuthor(value);
            break;
          case 'Course':
            this.searchByCourse(value);
            break;
        }

      });

  }

  searchByISBN(isbn: string) {
    this.filteredBooks = [];
    this.books.map((book, index) => {
      setTimeout(() => {
        if (book.isbn.indexOf(isbn) > -1) {
          this.filteredBooks.push(book);
        }
      }, index);
    });

  }
  searchByAuthor(author: string) {
    this.filteredBooks = [];
    this.books.map((book, index) => {
      setTimeout(() => {
        book.authors.map(authorName => {
          setTimeout(() => {
            if (authorName.toLocaleLowerCase().indexOf(author.toLocaleLowerCase()) > -1) {
              this.filteredBooks.push(book);
            }
          }, 0);
        });
      }, index);
    });


  }
  searchByCourse(course: string) {
    this.filteredBooks = [];
    this.books.map((book, index) => {
      setTimeout(() => {
        book.courses.map(courseName => {
          setTimeout(() => {
            if (courseName.toLocaleLowerCase().indexOf(course.toLocaleLowerCase()) > -1) {
              this.filteredBooks.push(book);
            }
          }, 0);
        });
      }, index);
    });


  }

  addToCart(book: Book) {
    this.orderService.addBook(book);
  }
}
