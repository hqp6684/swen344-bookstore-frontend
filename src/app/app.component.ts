import { AuthenticationService } from './core/services/authentication.service';
import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { ScrollDispatcher } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('container') container: ElementRef;
  showGoTop = false;
  containerNativeEl: HTMLElement;
  constructor(
    public authService: AuthenticationService,
    public sd: ScrollDispatcher,
  ) {

  }


  ngAfterViewInit() {
    const scrollable = this.sd.getScrollContainers(this.container)[0];
    const nativeElement: HTMLElement = scrollable.getElementRef().nativeElement;
    this.containerNativeEl = nativeElement;
    scrollable.elementScrolled()
      .throttleTime(50)
      .subscribe(e => {
        if (nativeElement.scrollTop > 100) {
          this.showGoTop = true;
        } else {
          this.showGoTop = false;
        }
      });

  }

  goTop() {
    this.containerNativeEl.scrollTop = 0;
    this.showGoTop = false;

  }
}
