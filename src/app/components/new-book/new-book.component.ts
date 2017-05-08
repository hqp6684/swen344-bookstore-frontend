import { AuthenticationService } from '../../core/services/authentication.service';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AngularFireDatabase } from 'angularfire2/database';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Book, Author } from '../../shared/models/book';
import { MdSnackBar } from '@angular/material';
import { HostBinding } from '@angular/core';
import { routerTransition } from '../../shared/animations/route-transition.animation';

@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.scss'],
  animations: [routerTransition()]
})
export class NewBookComponent implements OnInit {
  @HostBinding('@routerTransition') routeAnimation = '';
  isbnStatus = '';
  isbnFormControl = new FormControl();
  authorFormControl = new FormControl();
  classFormControl = new FormControl();
  // formIsValid = false;
  get formIsValid() {
    if (this.book.isbn && this.book.title) {
      return true;
    } else { return false; }

  }
  book = new Book();

  message = '';
  filteredAuthors: Observable<string[]>;
  filteredClasses: Observable<string[]>;

  constructor(
    private db: AngularFireDatabase,
    private http: Http,
    public authService: AuthenticationService,
    private snackBar: MdSnackBar

  ) {

    this.filteredAuthors = this.db.list('/authors', {
      query: {
        orderByChild: 'name',
        // equalTo: this.authorFormControl.valueChanges
        startAt: this.authorFormControl.valueChanges.debounceTime(100)
      }
    });

  }
  isIsbnValid(isbn: string) {
    return this.db.list('/books', {
      query: {
        orderByChild: 'isbn',
        equalTo: isbn
      }
    })
      .map(result => {
        if (result.length > 0) {
          return false;
        } else {
          return true;
        }
      });


  }

  ngOnInit() {
    this.isbnFormControl.valueChanges
      .filter(value => {
        if (value.length >= 9 && value.length < 13 && !isNaN(value)) {
          return true;
        } else {
          this.isbnStatus = 'error';
          this.message = '** ISBN is invalid or already used';
          // this.formIsValid = false;
          return false;
        }
      })
      .distinctUntilChanged()
      .debounceTime(100)
      .subscribe(value => {
        this.isbnStatus = 'hourglass_empty';
        // let newAccountKey = this.db.
        this.isIsbnValid(value).subscribe(isValid => {
          if (isValid) {
            this.isbnStatus = 'check';
            // this.formIsValid = true;
            this.book.isbn = value;
            this.message = '';
          } else {
            this.isbnStatus = 'error';
            this.message = '** ISBN is invalid or already used';
            // this.formIsValid = false;
          }
        });


      });

    this.filteredClasses = this.classFormControl.valueChanges
      .distinctUntilChanged()
      .debounceTime(200)
      // .map(value => {
      //   console.log(value);

      // })
      .flatMap(value => {
        return this.http.get(`https://crossorigin.me/https://tigercenter.rit.edu/tigerCenterSearch/api/auto?terms=${value}`)
          .map(res => {
            return res.json().autoResults;
          });
      })
      .map(value => {
        return value;
      });
  }

  addAuthor(author: string) {
    if (!author) { return; }
    this.db.list('/authors', {
      query: {
        orderByChild: 'name',
        equalTo: author
      }
    }).subscribe(result => {
      if (result.length === 0) {
        const newAuthor: Author = { name: author };
        this.db.list('/authors').push(newAuthor);
      }
      if (this.book.authors.indexOf(author) < 0) {
        this.book.authors.push(author);
      }
      this.authorFormControl.setValue('', {});

    });
  }


  addClass(course: string) {
    if (!course) { return; }
    if (this.book.courses.indexOf(course) < 0) {
      this.book.courses.push(course);
    }
    this.classFormControl.setValue('', {});

  }

  createBook() {
    this.db.list('/books').push(this.book);
    this.snackBar.open(`${this.book.isbn} has been addded`, 'Dismiss', { duration: 4000 });

    this.book = new Book();
  }


}
