import {Directive, ElementRef, Renderer2} from '@angular/core';

@Directive({
  selector: '[appVideoTile]'
})
export class VideoTileDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) {

  }

  get nativeElement() {
    return this.el.nativeElement;
  }
}
