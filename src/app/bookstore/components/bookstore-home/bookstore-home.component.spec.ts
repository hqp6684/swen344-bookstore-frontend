import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookstoreHomeComponent } from './bookstore-home.component';

describe('BookstoreHomeComponent', () => {
  let component: BookstoreHomeComponent;
  let fixture: ComponentFixture<BookstoreHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookstoreHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookstoreHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
