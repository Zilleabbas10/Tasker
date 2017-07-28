import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { ConversationPage } from '../conversation/conversation';

@Component({
  selector: 'page-chat-list-users',
  templateUrl: 'chat-list-users.html',
})
export class ChatListUsersPage {

  public getLoggedInUserData: FirebaseListObservable<any[]>;
  public getOwnerUserData: FirebaseListObservable<any[]>;
  public user_id: string;
  public appliedList: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth, public afDb: AngularFireDatabase) {
  	   this.afAuth.auth.onAuthStateChanged( user => { 
      //console.log(user);
    if (user){
      this.user_id = user.uid;
      console.log(this.user_id);

      this.getLoggedInUserData = this.afDb.list('/apply_jobs', {
            query: {
              orderByChild: 'applied_user_id',
              equalTo: user.uid
        }
      });

      this.getLoggedInUserData.subscribe( (userdata) => {
	      userdata.forEach( (snapshot) => {
          	this.appliedList.push(snapshot);
	      });
      });
    }
  });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatListUsersPage');
  }

/*
  getTaskOwnerDetails(taskOwnerId){
  	console.log(taskOwnerId);
      this.getOwnerUserData = this.afDb.list('/apply_jobs', {
            query: {
              orderByChild: 'taskowner_user_id',
              equalTo: taskOwnerId
        }
      });

      this.getOwnerUserData.subscribe( (userdata) => {

	  this.appliedUserList = [];
      	console.log(userdata);
        userdata.forEach( (snapshot) => {
        	console.log(snapshot);
          this.appliedUserList.push(snapshot);
      });
      })

  }*/

    startConversation(userTaskDetails){
    this.navCtrl.push(ConversationPage, { details: userTaskDetails, page: 'task_user'});
  }


}
