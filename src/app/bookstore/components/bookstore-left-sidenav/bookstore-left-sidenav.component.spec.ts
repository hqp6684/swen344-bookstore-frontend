import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookstoreLeftSidenavComponent } from './bookstore-left-sidenav.component';

describe('BookstoreLeftSidenavComponent', () => {
  let component: BookstoreLeftSidenavComponent;
  let fixture: ComponentFixture<BookstoreLeftSidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookstoreLeftSidenavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookstoreLeftSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
