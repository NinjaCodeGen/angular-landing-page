import { Component, HostListener, Inject, OnInit } from "@angular/core";
import { DOCUMENT } from '@angular/platform-browser';
import { EasingLogic } from 'ng2-page-scroll'
import { AuthService } from './../shared';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  public navIsOvered: boolean = false;

  constructor( @Inject(DOCUMENT) private document: any, public auth: AuthService) {
   } // : Document problem with AOT prod build https://github.com/Nolanus/ng2-page-scroll/issues/35

  @HostListener("window:scroll", [])
  onWindowScroll() {
    let number = this.document.body.scrollTop;
    if (!this.navIsOvered && number > 50) {
      this.navIsOvered = true;
    } else if (this.navIsOvered && number < 50) {
      this.navIsOvered = false;
    }
  }

  public myEasing: EasingLogic = {
    ease: (t: number, b: number, c: number, d: number): number => {
      // easeInOutExpo easing
      if (t === 0) return b;
      if (t === d) return b + c;
      if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
      return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    }
  };
}
