import { Component, OnInit } from '@angular/core';

import { Feature } from './feature';

import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

@Component({
  selector: 'ncg-features',
  templateUrl: './features.component.html'
})
export class FeaturesComponent implements OnInit {
  features: Feature[];
  featuresObservable: FirebaseListObservable<Feature[]>;

  constructor(public db: AngularFireDatabase) { }

  ngOnInit() {
    this.features =
      [
        {
          name: 'Angular CRUD Code Generator',
          desc: 'Download full source code for apps based on your schema in seconds. For enterprise teams, create your own template-sets and push directly to your local machine/environment for quick development.',
          url: 'http://ncg-test-ncg-ng-md.azurewebsites.net',
          imgUrl: 'https://cdn-images-1.medium.com/max/800/1*Zl0lsY09eO5y-mnYO18gUg.png',
          imgData: '',
          order: 1
        },
        {
          name: 'Template Sets',
          desc: 'Use our ever-growing library of template-sets that output Angular, Material Design, Bootstrap, Kendo UI, ionic, electron, React, Xamarin, .NET, JAVA, and countless other frameworks and component libraries.',
          url: 'http://ncg-test-ncg-ng-kui.azurewebsites.net',
          imgUrl: 'https://cdn-images-1.medium.com/max/800/1*Zl0lsY09eO5y-mnYO18gUg.png',
          imgData: '',
          order: 2
        },
        {
          name: 'Internal Memory DB',
          desc: 'The app code has an internal database so you can develop/proto-type without any REST-API/database, and switch over to the REST service when ready.',
          url: 'http://ncg-test-ncg-ionic.azurewebsites.net',
          imgUrl: 'https://cdn-images-1.medium.com/max/800/1*Zl0lsY09eO5y-mnYO18gUg.png',
          imgData: '',
          order: 3
        },
        {
          name: 'e2e Protractor/Jasmin/Karma code',
          desc: 'We currently generate starter e2e automated UI code  for end-to-end testing.',
          url: 'http://ncg-test-ncg-acw-bs.azurewebsites.net',
          imgUrl: 'https://cdn-images-1.medium.com/max/800/1*Zl0lsY09eO5y-mnYO18gUg.png',
          imgData: '',
          order: 4
        },
        {
          name: 'Schema Editor',
          desc: 'We are working on a nice schema editor... stay tuned for details!',
          url: 'http://ncg-test-ncg-acw-bs.azurewebsites.net',
          imgUrl: 'https://cdn-images-1.medium.com/max/800/1*Zl0lsY09eO5y-mnYO18gUg.png',
          imgData: '',
          order: 5
        }
      ];


      this.featuresObservable = this.db.list("/features");

      // init
      // this.features.forEach(
      //   feature => {
      //     this.featuresObservable.push(feature);
      //   }
      // );

      this.featuresObservable.subscribe(snapshot => {
        if(snapshot && snapshot.length) {
          this.features = snapshot;
          console.log(snapshot);
        }
      });
  }

}
