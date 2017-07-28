import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
//import { UserProvider } from '../user-provider/user-provider';

@Injectable()
export class ChatsProvider {
  constructor(public af: AngularFireDatabase/*, public up: UserProvider*/) {}

  // get list of Chats of a Logged In User
/*  getChats() {
     return this.up.getUid().then(uid => {
        let chats = this.af.list(`/users/${uid}/chats`);
        return chats;
     });
  }*/
  
  // Add Chat References to Both users
  addChats(uid,interlocutor) {
      // First User
      let endpoint = this.af.object(`/users/${uid}/chats/${interlocutor}`);
      endpoint.set(true);
      
      // Second User
      let endpoint2 = this.af.object(`/users/${interlocutor}/chats/${uid}`);
      endpoint2.set(true);
  }

  getChatRef(uid, interlocutor) {
      let firstRef = this.af.object(`/chats/${uid},${interlocutor}`, {preserveSnapshot:true});
      let promise = new Promise((resolve, reject) => {
          firstRef.subscribe(snapshot => {
                let a = snapshot.exists();
                if(a) {
                    resolve(`/chats/${uid},${interlocutor}`);
                } else {
                    let secondRef = this.af.object(`/chats/${interlocutor},${uid}`, {preserveSnapshot:true});
                    secondRef.subscribe(snapshot => {
                        let b = snapshot.exists();
                        if(!b) {
                            this.addChats(uid,interlocutor);
                        }
                    });
                    resolve(`/chats/${interlocutor},${uid}`);
                }
            });
      });
      
      return promise;
  }
}

