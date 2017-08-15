import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { TemplateSet } from './template-set';
import { GlobalService } from './../shared';

@Component({
  selector: 'ncg-gallery',
  templateUrl: './gallery.component.html'
})
export class GalleryComponent implements OnInit {
  @ViewChild('galleryItems') galleryItemsElement;

  templateSets: TemplateSet[];
  templateSetsObservable: FirebaseListObservable<TemplateSet[]>;

  constructor(public db: AngularFireDatabase, public gbs: GlobalService) { }

  ngOnInit() {
    // this.gbs.setStyle(this.galleryItemsElement, 'height', window.innerHeight + 'px');
    this.gbs.setStyle(this.galleryItemsElement, 'height', '400px');

    this.templateSets =
      [
        {
          name: 'Angular Material Design Template-Set',
          description: 'Angular Material Design Template-Set',
          url: 'http://ncg-test-ncg-ng-md.azurewebsites.net',
          imgUrl: 'assets/ng-md.png',
          imgData: '',
          order: 1,
          className: 'frame'
        },
        {
          name: 'Angular Bootstrap Template-Set',
          description: 'Angular Bootstrap Template-Set',
          url: 'http://ncg-test-ncg-acw-bs.azurewebsites.net',
          imgUrl: 'assets/ng-acw-bs.png',
          imgData: '',
          order: 2,
          className: 'frame'
        },
        {
          name: 'Angular Kendo UI Template-Set',
          description: 'Angular Kendo UI Template-Set',
          url: 'http://ncg-test-ncg-ng-kui.azurewebsites.net',
          imgUrl: 'assets/ng-kui.png',
          imgData: '',
          order: 3,
          className: 'frame'
        },
        {
          name: 'Ionic Template-Set',
          description: 'Ionic Template-Set',
          url: 'http://ncg-test-ncg-ionic.azurewebsites.net',
          imgUrl: 'assets/ionic.png',
          imgData: '',
          order: 4,
          className: 'frame'
        },
      ];

    // imgUrl: 'https://cdn-images-1.medium.com/max/800/1*Zl0lsY09eO5y-mnYO18gUg.png',

    this.templateSetsObservable = this.db.list("/template-sets");

    // init
    // this.templateSets.forEach(
    //   templateSet => {
    //     this.templateSetsObservable.push(templateSet);
    //   }
    // );

    // this.templateSetsObservable.update((<any>featureRequest).$key, newRating);

    this.templateSetsObservable.subscribe(snapshot => {
      if (snapshot && snapshot.length) {
        this.templateSets = snapshot;
        console.log(snapshot);
      }

    });

  }

}
