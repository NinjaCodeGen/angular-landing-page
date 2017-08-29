import { Component, Inject, OnInit, NgZone } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { EasingLogic } from 'ng2-page-scroll';
import { AuthService } from './../shared';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  public navIsOvered = false;
  public myEasing: EasingLogic = {
    ease: (t: number, b: number, c: number, d: number): number => {
      // easeInOutExpo easing
      if (t === 0) {
        return b;
      }
      if (t === d) {
        return b + c;
      }
      if ((t /= d / 2) < 1) {
        return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
      }
      return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    }
  };

  constructor( @Inject(DOCUMENT) private document: any, public auth: AuthService, public zone: NgZone) {
    zone.runOutsideAngular(() => {
      window.addEventListener('scroll', () => {
        const number = Math.min(this.document.body.scrollTop / 50, 1);
        document.getElementById('navbar').style.background = `rgba(238,25,51,${number})`;
      });
    });
  }
}
