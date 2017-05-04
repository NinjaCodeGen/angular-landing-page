import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFire, AuthProviders, FirebaseAuthState, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Banner } from './banner';

import { GlobalService } from './../shared';

@Component({
  selector: 'ncg-banner',
  templateUrl: './banner.component.html'
})
export class BannerComponent implements OnInit {
  @ViewChild('banner') bannerElement;
  banner1 = 'assets/ncg.gif?';
  banner2 = 'assets/ncg-banner.mp4';
  bannersObservable: FirebaseListObservable<Banner[]>;

  banners = [];
  constructor(public af: AngularFire, public gbs: GlobalService) {
  }

  ngOnInit() {
    // set max height for banner
    this.gbs.setStyle(this.bannerElement, 'height', window.innerHeight + 'px');

    this.banners =
      [
        {
          name: 'Ninja Code Gen',
          description: 'wonderful fantastic awesome amazing incredible description',
          url: 'http://ncg-test-ncg-ng-md.azurewebsites.net',
          imgUrl: 'assets/ncg.gif?',
          imgData: '',
          order: 1
        }
      ];

    this.bannersObservable = this.af.database.list("/banners");

    // init
    // this.banners.forEach(
    //   banner => {
    //     this.bannersObservable.push(banner);
    //   }
    // );

    this.bannersObservable.subscribe(snapshot => {
      if (snapshot && snapshot.length) {
        this.banners = snapshot;
        console.log(snapshot);
      }
    });
  }
}
