import { Injectable } from '@angular/core';
import { AngularFire, AuthProviders, FirebaseAuthState } from 'angularfire2';

@Injectable()
export class AuthService {
  public loggedInState: FirebaseAuthState;
  public loggedInUid: string;

  constructor(public af: AngularFire) {
    this.af.auth.subscribe(result => {
      this.loggedInState = result;
      if (result) {
        this.loggedInUid = result.uid;
      }
    });
  }

  public login() {
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

  public logout() {
    this.af.auth.logout();
  }
}
