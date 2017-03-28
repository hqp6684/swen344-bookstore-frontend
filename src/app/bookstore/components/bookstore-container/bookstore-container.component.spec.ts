import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookstoreContainerComponent } from './bookstore-container.component';

describe('BookstoreContainerComponent', () => {
  let component: BookstoreContainerComponent;
  let fixture: ComponentFixture<BookstoreContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookstoreContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookstoreContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
