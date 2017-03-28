import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookstoreTopToolbarComponent } from './bookstore-top-toolbar.component';

describe('BookstoreTopToolbarComponent', () => {
  let component: BookstoreTopToolbarComponent;
  let fixture: ComponentFixture<BookstoreTopToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookstoreTopToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookstoreTopToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
