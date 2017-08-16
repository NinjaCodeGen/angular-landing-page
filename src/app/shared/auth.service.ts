import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AuthService {
  public loggedInState: firebase.User;
  public loggedInUid: string;

  constructor(public auth: AngularFireAuth) {
    this.auth.authState.subscribe(result => {
      this.loggedInState = result;
      if (result) {
        this.loggedInUid = result.uid;
      }
    });
  }

  public login() {
    this.auth.auth.signInWithPopup(new firebase.auth.GithubAuthProvider())
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
    this.auth.auth.signOut();
  }
}
