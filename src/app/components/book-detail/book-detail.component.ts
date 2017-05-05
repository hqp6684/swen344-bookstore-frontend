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

  bookUrl: string;
  book: Book = new Book();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private db: AngularFireDatabase,
    public authService: AuthenticationService
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
    });

  }

  addReview(content) {
    const review = new Review(content, this.authService.account.email);
    let ref = this.db.object('/books/'.concat(this.book.$key));
    this.book.reviews.push(review);
    ref.update(this.book);


    console.log(content);

  }

}
