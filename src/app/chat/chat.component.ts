import { Component, OnInit, ViewChild } from '@angular/core';

import {
  AngularFire, AuthProviders,
  FirebaseAuthState, FirebaseListObservable, FirebaseObjectObservable
} from 'angularfire2';

import * as firebase from 'firebase';

@Component({
  selector: 'ncg-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @ViewChild('chatForm') chatForm;
  items: FirebaseListObservable<any>;
  name: any;
  msgVal: string = '';
  isMinizeChat = true;

  constructor(public af: AngularFire) {
  }

  ngOnInit() {
    this.items = this.af.database.list('/messages', {
      query: {
        limitToLast: 30
      }
    });

    this.af.auth.subscribe(auth => {
      if (auth) {
        this.name = auth;
         this.isMinizeChat = false;
      }
    });

    this.items.subscribe(result =>
    {
      if(result) {
      // successfully got another message, try to scroll if need
      this.scrollToNewest();
      }
    });
  }

  chatSend(message: string) {
    let name = 'an anonymous coder';

    if (this.name && this.name.auth) {
      name = this.name.auth.displayName;
    }

    this.items.push({ message, name, timestamp: firebase.database['ServerValue']['TIMESTAMP'] });
    this.msgVal = '';
  }

  login() {
    this.af.auth.login()
      .then(result => {
       
        // console.log('success');
        // console.log(result);
      })
      .catch(result => {
        // console.log('failure');
        // console.log(result);
      });
  }

  toDate(timestamp) {
    return new Date(timestamp);
  }

  scrollToNewest() {
    this.chatForm.nativeElement.scrollTop = this.chatForm.nativeElement.scrollHeight;
  }
}
