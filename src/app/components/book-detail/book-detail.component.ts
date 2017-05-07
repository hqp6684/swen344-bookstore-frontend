import { OrderService } from '../../core/services/order.service';
import { AuthenticationService } from '../../core/services/authentication.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Book, Review } from '../../shared/models/book';
import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {
  canReview = false;
  bookUrl: string;
  book: Book = new Book();
  rate = 5;
  rates = [1, 2, 3, 4, 5];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private db: AngularFireDatabase,
    public authService: AuthenticationService,
    public orderService: OrderService
  ) {

  }


  ngOnInit() {
    this.bookUrl = this.route.snapshot.params['id'];

    this.db.list('/books', {
      query: {
        orderByChild: 'isbn',
        equalTo: this.bookUrl
      }
    }).subscribe(books => {
      if (books.length === 0) {
        this.router.navigate(['/']);
      }
      books[0].authors ? books[0].authors : books[0].authors = [];
      books[0].courses ? books[0].courses : books[0].courses = [];
      books[0].reviews ? books[0].reviews : books[0].reviews = new Array();
      this.book = books[0];
      this.orderService.canReview(this.book.isbn).subscribe(result => {
        this.canReview = result;
      });
    });

  }

  addReview(content) {
    const review = new Review(content, this.authService.account.email, this.rate);
    const ref = this.db.object('/books/'.concat(this.book.$key));
    this.book.reviews.push(review);
    ref.update(this.book);
  }

  addToCart(book: Book) {
    this.orderService.addBook(book);
  }

  getRate(score: number) {
    const rates = [];
    for (let i = 1; i <= score; i++) {
      rates.push('a');
    }
    return rates;

  }

}
