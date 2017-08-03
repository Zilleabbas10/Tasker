import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { ConversationPage } from '../conversation/conversation';

@Component({
  selector: 'page-chat-list',
  templateUrl: 'chat-list.html',
})
export class ChatListPage {

  public tasks: FirebaseListObservable<any[]>;
  public apply_jobs: FirebaseListObservable<any[]>;
  public user: FirebaseListObservable<any[]>;
  public getLoggedInUserData: FirebaseListObservable<any[]>;
  public getOwnerUserData: FirebaseListObservable<any[]>;
  public ownerOfAppliedTask: boolean = false;
  public usersTasks: boolean = false;
  public loading: any;
  public data: any;
  public user_id: string;
  public keys: any = [];
  public result: any = [];
  public taskList: any = [];
  public appliedUserList: any = [];
  public appliedList: any = [];
  public FinalUserList: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingctrl: LoadingController, private afAuth: AngularFireAuth, public afDb: AngularFireDatabase) {

   this.afAuth.auth.onAuthStateChanged( user => { 
      //console.log(user);
    if (user){
      this.user_id = user.uid;
      console.log(this.user_id);
      this.apply_jobs = this.afDb.list('/apply_jobs', {
            query: {
              orderByChild: 'taskowner_user_id',
              equalTo: user.uid
        }
      });

          this.loading = this.loadingctrl.create({
            content: 'Loading...',
          });
          this.loading.present();

      this.getUserForTasks(this.apply_jobs);

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
    console.log('ionViewDidLoad ChatListPage');

  }



  getUserForTasks(user){
    user.subscribe( (snapshots) => {
      if(snapshots != undefined || snapshots != null){
        this.usersTasks = true;
        this.loading.dismissAll();
        this.appliedUserList = [];
        snapshots.forEach( (snapshot) => {
            this.appliedUserList.push(snapshot);
        });
    }
      console.log(this.appliedUserList);
  });
  }

  startConversation(userTaskDetails, page, ownerUser, status){
    let Status;
    if(status == 1){
      Status = true;
    }
    else{
      Status = false;
    }
    this.navCtrl.push(ConversationPage, { details: userTaskDetails, page: page, ownerUser: ownerUser, status: Status});
  }

}
