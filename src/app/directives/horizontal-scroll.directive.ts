import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHorizontalScroll]'
})
export class HorizontalScrollDirective {

  isDown: boolean = false;
  isLeft: boolean = true;
  startX: any;
  scrollLeft: any;
  private interval: any;

  constructor(
    private element: ElementRef
  ) {
    this.slide();
  }

  slide() {
    const time = 10;
    this.interval = setInterval(() => {
      const scroll = this.element.nativeElement.scrollLeft;
      this.slideLeft(scroll);
      if (scroll === this.element.nativeElement.scrollLeft) {
        this.isLeft = false;
      } else if (scroll === 0) {
        this.isLeft = true;
      }

      if (this.isLeft) {
        this.slideLeft(scroll)
      } else {
        this.slideRight(scroll)
      }

    }, time);
  }

  slideLeft(scroll) {
    this.element.nativeElement.scrollLeft = scroll + 1;
  }

  slideRight(scroll) {
    this.element.nativeElement.scrollLeft = scroll - 1;
  }

  @HostListener('mouseover') onHover() {
    clearInterval(this.interval)
  }

  @HostListener('mousedown', ['$event']) onMouseDown(event) {

    this.isDown = true;
    this.startX = event.pageX - this.element.nativeElement.offsetLeft;
    this.scrollLeft = this.element.nativeElement.scrollLeft;

  }

  @HostListener('mouseleave') mouseLeave() {

    this.isDown = false;
    this.slide();

  }

  @HostListener('mouseup') mouseUp() {

    this.isDown = false;

  }

  @HostListener('mousemove', ['$event']) mouseMove(event) {

    if (!this.isDown) {
      return;
    }

    event.preventDefault();
    const x = event.pageX - this.element.nativeElement.offsetLeft;
    const walk = (x - this.startX); // scroll fast
    this.element.nativeElement.scrollLeft = this.scrollLeft - walk;

  }

}
