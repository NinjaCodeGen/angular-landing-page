import { Injectable, ElementRef } from '@angular/core';

@Injectable()
export class GlobalService {
  constructor() {
  }

  public setStyle(elem: ElementRef, style: string, value) {
    elem.nativeElement.style[style] = value;
  }
}
