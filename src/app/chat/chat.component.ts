import { Component, OnInit, ViewChild } from '@angular/core';

import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

// import * as firebase from 'firebase';
declare var firebase: any;

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

  constructor(public db: AngularFireDatabase, public afAuth: AngularFireAuth) {
  }

  ngOnInit() {
    this.items = this.db.list('/messages', {
      query: {
        limitToLast: 30
      }
    });

    this.afAuth.authState.subscribe(auth => {
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

  toDate(timestamp) {
    return new Date(timestamp);
  }

  scrollToNewest() {
    this.chatForm.nativeElement.scrollTop = this.chatForm.nativeElement.scrollHeight;
  }
}
