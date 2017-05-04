import { Component, OnInit } from '@angular/core';
import { keyframes, trigger, state, style, transition, animate, group } from '@angular/animations';
import { AngularFire, AuthProviders, FirebaseAuthState, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { MdSnackBar } from '@angular/material';

import { Subject } from 'rxjs/Subject';

import { FeatureRequest } from './feature-request';
import { Rating } from './rating';
import { User } from './user';

@Component({
  selector: 'ncg-feature-request-ratings',
  templateUrl: './feature-request-ratings.component.html',
  animations: [
    trigger('itemAnim', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        animate(700, keyframes([
          style({ opacity: 0, transform: 'translateX(-100%)', offset: 0 }),
          style({ opacity: 1, transform: 'translateX(15px)', offset: 1.0 }),
          style({ opacity: 1, transform: 'translateX(0)', offset: 1.7 })
        ]))
      ]),
      transition('* => void', [
        animate(300, keyframes([
          style({ opacity: 1, transform: 'translateX(0)', offset: 0 }),
          style({ opacity: 1, transform: 'translateX(-15px)', offset: 0.3 }),
          style({ opacity: 0, transform: 'translateX(100%)', offset: 1.0 })
        ]))
      ])
    ])
  ]
})
export class FeatureRequestRatingsComponent implements OnInit {
  loggedInState: FirebaseAuthState;
  myFeatureRequestRatings: FirebaseListObservable<FeatureRequest[]>;
  myFFRObject: any;
  myFFRObjectObservable: any;
  myFRRSnapshot = [];

  loggedInUid: string;
  emailForNewsletter: string;

  featureRequests: FirebaseListObservable<FeatureRequest[]>;
  myRatings: FirebaseListObservable<Rating[]>;
  newFeatureRequest: FeatureRequest = new FeatureRequest(
    null, null, 0, 3, null, null);

  items: FirebaseListObservable<any[]>;
  item: FirebaseObjectObservable<any>;
  item2: FirebaseObjectObservable<any>;
  sizeSubject: Subject<any>;
  categorySubject: Subject<any>;
  uidSubject: Subject<any>;

  features: FirebaseListObservable<any[]>;
  featureItem: any = {};

  constructor(public af: AngularFire, public snackBar: MdSnackBar) {

  }

  ngOnInit() {
    this.featureRequests = this.af.database.list('/feature-requests');
    this.myRatings = this.af.database.list('/user-ratings', {
      query: {
        orderByChild: 'uid',
        equalTo: this.uidSubject
        // limitToLast: 100,
      }
    });


    this.af.auth.subscribe(result => {
      this.loggedInState = result;
      if (result) {
        this.loggedInUid = result.uid;
        this.emailForNewsletter = result.auth.email;
        // this.uidSubject.next(this.loggedInUid);

        this.myFeatureRequestRatings = this.af.database.list("/user-feature-request-ratings/" + this.loggedInUid);
        this.myFeatureRequestRatings.subscribe(snapshot => {
          this.myFRRSnapshot = snapshot;
          console.log(snapshot);
        });


        this.myFFRObjectObservable = this.af.database.object("/user-feature-request-ratings/" + this.loggedInUid);
        this.myFFRObjectObservable.subscribe(snapshot => {
          this.myFFRObject = snapshot;
          console.log(snapshot);
        });

      }

      // this.myFeatureRequestRatings.subscribe(r => {
      //   debugger;
      //   return r;
      // }, e => {
      //   debugger;
      // });

      //this.myFeatureRequestRatings = this.af.database.object("/user-feature-request-ratings/" + this.loggedInUid);
    });

    // relative URL, uses the database url provided in bootstrap
    // const relative = af.database.object('/item');
    // // absolute URL
    // const absolute = af.database.object('https://<your-app>.firebaseio.com/item');
    this.items = this.af.database.list('/messages');
    this.item = this.af.database.object('/item', { preserveSnapshot: true });
    this.item2 = this.af.database.object('/item');

    this.sizeSubject = new Subject();
    this.features = this.af.database.list('/features', {
      query: {
        orderByChild: 'avgRating',
        // equalTo: this.sizeSubject
        limitToLast: 100,
      }
    });



    this.item.subscribe(snapshot => {
      console.log(snapshot);
      console.log(snapshot.val());
    });

    this.item2.subscribe(snapshot => {
      console.log(snapshot.$key);
      console.log(snapshot);
    });

    this.items
      .subscribe(snapshots => {
        snapshots.forEach(snapshot => {
          // console.log(snapshot.key)
          // console.log(snapshot.val())
        });
      });

  }

  save(newName: string) {
    this.item.set({ name: newName });
  }
  update(newSize: string) {
    this.item.update({ size: newSize });
  }
  delete() {
    this.item.remove();
  }


  addItem(newName: string) {
    this.items.push({ text: newName });
  }
  updateItem(key: string, newText: string) {
    this.items.update(key, { text: newText });
  }
  deleteItem(key: string) {
    this.items.remove(key);
  }
  deleteEverything() {
    this.items.remove();
  }


  filterBy(size: string) {
    this.sizeSubject.next(size);
  }

  filterByCategory(category: string) {
    this.categorySubject.next(category);
  }

  addFeature() {
    this.features.push(JSON.parse(JSON.stringify(this.featureItem)));
  }
  updateFeature(feature) {
    this.features.update(feature.$key, feature);
  }
  deleteFeature(feature) {
    this.features.remove(feature.$key);
  }

  addFeatureRequest() {
    this.newFeatureRequest.creatorUid = this.loggedInUid;
    this.featureRequests.push(JSON.parse(JSON.stringify(this.newFeatureRequest)));
  }
  updateFeatureRequest(featureRequest) {
    this.featureRequests.update(featureRequest.$key, featureRequest);
  }
  deleteFeatureRequest(featureRequest) {
    this.featureRequests.remove(featureRequest.$key);
  }

  addMyRating(featureRequest: FeatureRequest, // FeatureRequest, 
    ratingValue: number) {

    // need to add to 
    let newRating = new Rating(this.loggedInUid, (<any>featureRequest).$key, ratingValue);

    // 1. feature-requests - featureRequest.ratings collection
    if (!featureRequest.ratings) {
      featureRequest.ratings = {};
    }
    featureRequest.ratings[this.loggedInUid] = newRating;

    let count = 0;
    let sum = 0;
    let avg = 0;
    // update sum/avg
    Object.keys(featureRequest.ratings).forEach(key => {
      count++;
      sum += featureRequest.ratings[key].value;
      // console.log(key);
      // console.log(featureRequest.ratings[key]);
    })
    avg = sum / count;

    featureRequest.avgRating = avg;
    featureRequest.numberOfRatings = count;

    this.featureRequests.update((<any>featureRequest).$key, featureRequest);


    // 2. user-ratings - key is userid, then use key of feature request to store rating
    this.myFeatureRequestRatings.update((<any>featureRequest).$key, newRating);
    // this.myRatings.newRating);
    // this.featureRequests(featureRequest)



    // this.sum = this.af.database('location').map(items => items.reduce((a, b) => a + b, 0))
    // {{sum | async}}
  }
  // updateMyRating(rating) {
  //   this.featureRequests.update(rating.$key, rating);
  // }
  // deleteMyRating(rating) {
  //   this.featureRequests.remove(rating.$key);
  // }

  login() {
    this.af.auth.login()
      .then(result => {
        console.log('success');
        console.log(result);
      })
      .catch(result => {
        console.log('failure');
        console.log(result);
      });
  }

  logout() {
    this.af.auth.logout();
  }

  signUpNewsletter() {
    let emails = this.af.database.list('/emails');
    emails.push(this.emailForNewsletter).then(
      r => {
        this.snackBar.open('Sign up successful!', 'GLHF!', { duration: 2000 });
      }
    );
    //emails.
  }

}
