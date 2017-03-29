import { Http } from '@angular/http';
import { Book } from './models/book';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';

@Injectable()
export class BookstoreService {
  private apiRootUrl = 'http://vm344a.se.rit.edu/api';

  constructor(private http: Http) { }


  getAllBooks(): Observable<Book[]> {
    return this.http.get(this.apiRootUrl.concat('/books')).map(res => {
      return res.json();
    });

  }

}





