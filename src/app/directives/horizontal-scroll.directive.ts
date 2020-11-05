import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHorizontalScroll]'
})
export class HorizontalScrollDirective {

  isDown: boolean = false;
  startX: any;
  scrollLeft: any;

  constructor(
    private element: ElementRef
  ) { }

  @HostListener('mousedown', ['$event']) onMouseDown(event) {

    this.isDown = true;
    this.startX = event.pageX - this.element.nativeElement.offsetLeft;
    this.scrollLeft = this.element.nativeElement.scrollLeft;

  }

  @HostListener('mouseleave') mouseLeave() {

    this.isDown = false;

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
